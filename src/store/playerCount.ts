import { writable } from 'svelte/store'

export const HIGHEST_PLAYER_COUNT = 19

export const playerCount = writable<number>(0)

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
