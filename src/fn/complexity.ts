export const HIGHEST_COMPLEXITY = 5
export const LOWEST_COMPLEXITY = 0
const DECIMALS = 1

export const weightToText = (weight: number) => {
	if (weight < 2.5) {
		return 'easy'
	} else if (weight < 4) {
		return 'moderate'
	}
	return 'hard'
}

export const isAny = (range: readonly [number, number]) => {
	const [start, end] = range
	return start === LOWEST_COMPLEXITY && end === HIGHEST_COMPLEXITY
}

export const formatComplexityRange = (range: readonly [number, number]) => {
	if (isAny(range)) {
		return 'any'
	}
	const [start, end] = range
	const startText = weightToText(start)
	const endText = weightToText(end)
	if (startText === endText) {
		return startText
	}
	return `${startText}-${endText}`
}

//Normalized means a range between 0-1
export const normalizedRangeToComplexity = (range: readonly [number, number]) => {
	return [
		Number((range[0] * HIGHEST_COMPLEXITY).toFixed(DECIMALS)),
		Number((range[1] * HIGHEST_COMPLEXITY).toFixed(DECIMALS))
	] as const
}

export const complexityRangeToNormalized = (range: readonly [number, number]) => {
	return [range[0] / HIGHEST_COMPLEXITY, range[1] / HIGHEST_COMPLEXITY] as const
}
