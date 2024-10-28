import { fetchStats } from '$lib/bgg/stats/api'
import type { StatsResponse } from '$lib/bgg/stats/parsing'

export type WorkerMessage = { type: 'chunk'; chunkComplete: number } | { type: 'stats'; stats: StatsResponse[] }

self.onmessage = async (e) => {
	const ids = e.data
	const stats = await fetchStats(ids, (chunkComplete) => {
		self.postMessage({ type: 'chunk', chunkComplete })
	})
	self.postMessage({ type: 'stats', stats })
}
