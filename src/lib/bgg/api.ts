import { fetchCollection } from '$lib/bgg/collection/api'
import type { StatsResponse } from '$lib/bgg/stats/parsing'
import type { Boardgame } from '$lib/types'
import { error } from '@sveltejs/kit'

export async function loadFromBgg(userId: string): Promise<{ boardgames: Boardgame[] }> {
	const collection = await fetchCollection(userId)
	if (!collection) {
		error(500, 'Could not get boardgames for user')
	}
	const ids = collection.games.map((it) => it.id)

	const stats = await prepareStats(ids)

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

const prepareStats = async (ids: string[]): Promise<Record<string, Boardgame['stats']>> => {
	const idChunks = chunkBoardgameIds(ids)
	const stats: Record<string, Boardgame['stats']> = {}

	const promises: Promise<StatsResponse[]>[] = []
	for (const chunk of idChunks) {
		promises.push(spawnWorker(chunk))
	}

	const chunks = await Promise.all(promises)

	chunks
		.flatMap((it) => it)
		.forEach((it) => {
			stats[it.id] = it.stats
		})

	return stats
}

const spawnWorker = async (ids: string[]): Promise<StatsResponse[]> => {
	const worker = new Worker(new URL('./stats/worker.ts', import.meta.url), { type: 'module' })
	worker.postMessage(ids)

	const result = await new Promise<StatsResponse[]>((res) => {
		worker.onmessage = (e) => {
			res(e.data)
		}
	})

	return result
}

const chunkBoardgameIds = (ids: string[]) => {
	const amountOfWorkers = 8
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
