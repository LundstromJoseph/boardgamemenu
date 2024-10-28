import { browser } from '$app/environment'
import { filterState } from '$lib/fn/filter'
import { complexityState } from '$lib/state/complexity.svelte'
import { gameLengthState } from '$lib/state/gameLength.svelte'
import { playerCountState } from '$lib/state/playerCount.svelte'
import type { Boardgame } from '$lib/types'

const BOARDGAMES_KEY = 'boardgame_menu_store'

/**
 * Special case when something goes wrong
 */
export const clearLocalStorage = () => {
	localStorage.removeItem(BOARDGAMES_KEY)
}

export type BoardgameState = ReturnType<typeof createBoardgameState>
export const createBoardgameState = () => {
	let userId = $state<string | undefined>(undefined)
	let boardgames = $state<Boardgame[]>([])

	if (browser) {
		const stored = localStorage.getItem(BOARDGAMES_KEY)
		if (stored) {
			const state: { userId: string | undefined; boardgames: Boardgame[] } = JSON.parse(stored)
			userId = state.userId
			boardgames = state.boardgames
		}
	}

	const complexity = complexityState()
	const gameLength = gameLengthState()
	const playerCount = playerCountState()

	const filteredBoardgames = $derived(
		filterState({
			complexity: complexity.get(),
			gameLength: gameLength.get(),
			playerCount: playerCount.get(),
			boardgames
		})
	)

	return {
		load: (newBoardgames: Boardgame[], newUserId: string) => {
			boardgames = newBoardgames
			userId = newUserId
			localStorage.setItem(BOARDGAMES_KEY, JSON.stringify({ boardgames, userId }))
		},
		clear: () => {
			boardgames = []
			userId = undefined
			localStorage.removeItem(BOARDGAMES_KEY)
		},
		getBoardgames: (filtered = false) => (filtered ? filteredBoardgames : boardgames),
		getUserId: () => userId,
		filters: {
			complexity,
			gameLength,
			playerCount
		}
	}
}
