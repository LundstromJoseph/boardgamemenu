import type { Range } from '$lib/types'

export const LOWEST_STEP = 15
export const HIGHEST_STEP = 360

export const gameLengthState = () => {
	let state = $state<Range>([LOWEST_STEP, HIGHEST_STEP])
	return {
		get: () => state,
		set: (value: Range) => (state = value),
		isAny: () => isAny(state)
	}
}

export const isAny = (range: Range) => {
	return range[0] === LOWEST_STEP && range[1] === HIGHEST_STEP
}
