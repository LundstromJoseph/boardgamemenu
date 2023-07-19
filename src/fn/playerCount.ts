const HIGHEST_PLAYER_COUNT = 7

export const isAny = (playerCount: number) => {
	return playerCount === 0
}

export const formatPlayerCount = (playerCount: number) => {
	if (isAny(playerCount)) {
		return 'any'
	} else if (playerCount === HIGHEST_PLAYER_COUNT) {
		return '7+'
	} else {
		return playerCount.toLocaleString(undefined, { maximumFractionDigits: 0 })
	}
}
