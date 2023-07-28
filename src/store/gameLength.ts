import { writable } from 'svelte/store'
import type { Range } from '../types/boardgames'

export const LOWEST_STEP = 15
export const HIGHEST_STEP = 360

export const gameLength = writable<Range>([LOWEST_STEP, HIGHEST_STEP])

export const formatMinutes = (fullMinutes: number) => {
	const hours = Math.floor(fullMinutes / 60)
	const minutes = fullMinutes - hours * 60
	let formattedString = ''
	formattedString =
		formattedString + `${hours}:${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
	if (fullMinutes === HIGHEST_STEP) {
		formattedString += '+'
	}

	return formattedString
}

export const formatGameLengthForBottomBar = (range: Range) => {
	if (isAny(range)) {
		return 'any'
	}
	return `${formatMinutes(range[0])}-${formatMinutes(range[1])}`
}

export const isAny = (range: Range) => {
	return range[0] === LOWEST_STEP && range[1] === HIGHEST_STEP
}
