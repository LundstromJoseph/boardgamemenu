import { browser } from '$app/environment'
import { filterState } from '$lib/fn/filter'
import { complexityState } from '$lib/store/complexity.svelte'
import { gameLengthState } from '$lib/store/gameLength.svelte'
import { playerCountState } from '$lib/store/playerCount.svelte'
import type { Boardgame } from '$lib/types'

const BOARDGAMES_KEY = 'boardgame_menu_store'

export const boardgameStore = (function () {
	let boardgames = $state<{
		userId: string | undefined
		boardgames: Boardgame[]
	}>({ userId: undefined, boardgames: [] })

	if (browser) {
		const stored = localStorage.getItem(BOARDGAMES_KEY)
		if (stored) {
			boardgames = JSON.parse(stored)
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
			boardgames: boardgames.boardgames
		})
	)

	return {
		set: (newBoardgames: { userId: string | undefined; boardgames: Boardgame[] }) => {
			boardgames = newBoardgames
			localStorage.setItem(BOARDGAMES_KEY, JSON.stringify(boardgames))
		},
		get: () => boardgames,
		filters: {
			complexity,
			gameLength,
			playerCount
		},
		getFiltered: () => filteredBoardgames
	}
})()
