export const createLoadingState = () => {
	let { totalCount, loadedCount } = $state({ totalCount: 0, loadedCount: 0 })

	return {
		getTotal: () => totalCount,
		getLoaded: () => loadedCount,
		setTotal: (count: number) => (totalCount = count),
		loadedMore: (count: number) => {
			loadedCount += count
		}
	}
}

export type LoadingState = ReturnType<typeof createLoadingState>
