import { fetchCollection } from '$lib/bgg/collection/api'
import type { StatsResponse } from '$lib/bgg/stats/parsing'
import type { WorkerMessage } from '$lib/bgg/stats/worker'
import type { LoadingState } from '$lib/state/loading.svelte'
import type { Boardgame } from '$lib/types'
import { error } from '@sveltejs/kit'

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

	const promises: Promise<StatsResponse[]>[] = []
	for (const chunk of idChunks) {
		promises.push(spawnWorker(chunk, loadingState))
	}

	const chunks = await Promise.all(promises)

	chunks
		.flatMap((it) => it)
		.forEach((it) => {
			stats[it.id] = it.stats
		})

	return stats
}

const spawnWorker = async (ids: string[], loadingState: LoadingState): Promise<StatsResponse[]> => {
	const worker = new Worker(new URL('./stats/worker.ts', import.meta.url), { type: 'module' })
	worker.postMessage(ids)

	const result = await new Promise<StatsResponse[]>((res) => {
		worker.onmessage = (e) => {
			const message = e.data as WorkerMessage
			if (message.type === 'chunk') {
				loadingState.loadedMore(message.chunkComplete)
			} else if (message.type === 'stats') {
				res(message.stats)
			}
		}
	})

	return result
}

const chunkBoardgameIds = (ids: string[]) => {
	const amountOfWorkers = 1
	if (ids.length <= amountOfWorkers) {
		return [ids]
	}
	const chunkSize = Math.ceil(ids.length / amountOfWorkers)

	const idChunks: string[][] = []
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize))
	}
	return idChunks
}
