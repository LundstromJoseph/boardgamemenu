import type { Range } from '$lib/types'

export const LOWEST_COMPLEXITY = 0
export const HIGHEST_COMPLEXITY = 5

export const isAny = (range: readonly [number, number]) => {
	const [start, end] = range
	return start === LOWEST_COMPLEXITY && end === HIGHEST_COMPLEXITY
}

export const complexityState = () => {
	let state = $state<Range>([LOWEST_COMPLEXITY, HIGHEST_COMPLEXITY])
	return {
		get: () => state,
		set: (value: Range) => (state = value),
		isAny: () => isAny(state)
	}
}
