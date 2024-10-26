import { simpleState } from '$lib/fn/simplestate.svelte'
import type { Range } from '$lib/types'

export const LOWEST_COMPLEXITY = 0
export const HIGHEST_COMPLEXITY = 5

export const complexityDescription = (weight: number) => {
	if (weight < 2.5) {
		return `easy`
	} else if (weight < 4) {
		return 'moderate'
	} else {
		return 'hard'
	}
}

export const formatComplexityForBottomBar = (range: Range) => {
	if (isAny(range)) {
		return 'any'
	}
	const [start, end] = range
	const startText = complexityDescription(start)
	const endText = complexityDescription(end)
	if (startText === endText) {
		return startText
	}
	return `${startText}-${endText}`
}

export const isAny = (range: readonly [number, number]) => {
	const [start, end] = range
	return start === LOWEST_COMPLEXITY && end === HIGHEST_COMPLEXITY
}

export const complexityState = simpleState<Range>([LOWEST_COMPLEXITY, HIGHEST_COMPLEXITY])
