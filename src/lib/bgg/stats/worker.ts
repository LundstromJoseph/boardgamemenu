import { fetchStats } from '$lib/bgg/stats/api'
import type { StatsResponse } from '$lib/bgg/stats/parsing'

export type StatsWorkerMessage = { status: 'rate_limited'; ids: string[] } | { status: 'ok'; stats: StatsResponse[] }

self.onmessage = async (e) => {
	const ids = e.data
	const [stats, error] = await fetchStats(ids)
	const message: StatsWorkerMessage = error ? { status: 'rate_limited', ids } : { status: 'ok', stats }

	self.postMessage(message)
}
