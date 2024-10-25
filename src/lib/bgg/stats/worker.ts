import { fetchStats } from "$lib/bgg/stats/api"

self.onmessage = async (e) => {
	const ids = e.data
	const stats = await fetchStats(ids)
	self.postMessage(stats)
}
