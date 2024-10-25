import { simpleState } from '$lib/fn/simplestate.svelte'

export const HIGHEST_PLAYER_COUNT = 20

export const playerCountState = simpleState<number>(0)

export const isAny = (playerCount: number) => {
	return playerCount === 0
}

export const formatPlayerCount = (playerCount: number) => {
	if (isAny(playerCount)) {
		return 'any'
	} else if (playerCount === HIGHEST_PLAYER_COUNT) {
		return HIGHEST_PLAYER_COUNT + '+'
	} else {
		return playerCount.toLocaleString(undefined, { maximumFractionDigits: 0 })
	}
}

export const formatPlayerCountForBottomBar = formatPlayerCount
