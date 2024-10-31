import { fetchCollection } from '$lib/bgg/collection/api'
import type { StatsWorkerMessage } from '$lib/bgg/stats/worker'
import type { LoadingState } from '$lib/state/loading.svelte'
import type { Boardgame } from '$lib/types'
import { error } from '@sveltejs/kit'

const MAX_WORKERS = 8

export async function loadFromBgg(userId: string, loadingState: LoadingState): Promise<{ boardgames: Boardgame[] }> {
	const collection = await fetchCollection(userId)
	if (!collection) {
		error(500, 'Could not get boardgames for user')
	}
	const ids = collection.games.map((it) => it.id)

	loadingState.setTotal(ids.length)

	const stats = await prepareStats(ids, loadingState)

	return {
		boardgames: collection.games.map((it) => ({
			id: it.id,
			image: it.image,
			name: decodeHtml(it.name),
			stats: stats[it.id]
		}))
	}
}

const decodeHtml = (html: string) => {
	const txt = document.createElement('textarea')
	txt.innerHTML = html
	return txt.value
}

const prepareStats = async (ids: string[], loadingState: LoadingState): Promise<Record<string, Boardgame['stats']>> => {
	const idChunks = chunkBoardgameIds(ids)
	const stats: Record<string, Boardgame['stats']> = {}

	const startTime = Date.now()
	console.log('Getting stats')

	const waitingTime = waitingTimeCalculator()

	while (idChunks.length > 0) {
		const promises: Promise<StatsWorkerMessage>[] = []

		const ids = idChunks.splice(0, MAX_WORKERS)
		for (const chunk of ids) {
			promises.push(spawnWorker(chunk, loadingState))
		}
		const chunks = await Promise.all(promises)
		const rateLimited = chunks.filter((it) => it.status === 'rate_limited')
		console.log(`Rate limited ${rateLimited.length} times`)
		idChunks.push(...rateLimited.map((it) => it.ids))
		chunks
			.filter((it) => it.status === 'ok')
			.map((it) => it.stats)
			.flatMap((it) => it)
			.forEach((it) => {
				stats[it.id] = it.stats
			})
		await new Promise((res) => setTimeout(res, waitingTime.newWaitTime(rateLimited.length)))
	}

	console.log(`Got stats in ${Math.round((Date.now() - startTime) / 1000)}s`)

	return stats
}

const waitingTimeCalculator = () => {
	const increase = 1000

	let previousRateLimit = 0
	let waitTime = 0

	return {
		newWaitTime: (rateLimited: number) => {
			if (rateLimited >= previousRateLimit) {
				waitTime = Math.min(waitTime + increase, 10000)
			}
			if (rateLimited === 0) {
				waitTime = Math.max(0, waitTime - increase)
			}
			previousRateLimit = rateLimited
			console.log(`Waiting ${waitTime}ms`)
			return waitTime
		}
	}
}

const spawnWorker = async (ids: string[], loadingState: LoadingState): Promise<StatsWorkerMessage> => {
	const worker = new Worker(new URL('./stats/worker.ts', import.meta.url), { type: 'module' })
	worker.postMessage(ids)

	const result = await new Promise<StatsWorkerMessage>((res) => {
		worker.onmessage = (e) => {
			const message = e.data as StatsWorkerMessage
			if (message.status === 'ok') {
				loadingState.loadedMore(message.stats.length)
			}
			res(message)
		}
	})

	return result
}

const chunkBoardgameIds = (ids: string[]) => {
	const chunkSize = 20 //BGG limit
	const idChunks: string[][] = []
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize))
	}
	return idChunks
}
