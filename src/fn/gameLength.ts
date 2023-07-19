export const ALLOWED_STEPS = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 300, 360] as const
export type Gamelength = (typeof ALLOWED_STEPS)[number]
export const LOWEST_STEP = ALLOWED_STEPS[0]
export const HIGHEST_STEP = ALLOWED_STEPS[ALLOWED_STEPS.length - 1]

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

export const isAny = (range: readonly [number, number]) => {
	const [start, end] = range
	return start === LOWEST_STEP && end === HIGHEST_STEP
}

export const formatGameLengthRange = (range: readonly [Gamelength, Gamelength]) => {
	if (isAny(range)) {
		return 'any'
	}
	const [start, end] = range
	return `${formatMinutes(start)}-${formatMinutes(end)}`
}

const normalizedValueToAllowedStep = (value: number) => {
	return ALLOWED_STEPS[Math.floor((ALLOWED_STEPS.length - 1) * value)]
}

const allowedStepToNormalizedValue = (value: Gamelength) => {
	const index = ALLOWED_STEPS.indexOf(value)
	return index / (ALLOWED_STEPS.length - 1)
}

//Normalized means a range between 0-1
export const normalizedRangeToGameLength = (range: readonly [number, number]) => {
	return [normalizedValueToAllowedStep(range[0]), normalizedValueToAllowedStep(range[1])] as const
}

export const gameLengthRangeToNormalize = (range: readonly [Gamelength, Gamelength]) => {
	return [allowedStepToNormalizedValue(range[0]), allowedStepToNormalizedValue(range[1])] as const
}
