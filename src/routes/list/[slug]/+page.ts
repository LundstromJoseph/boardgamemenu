import { browser } from '$app/environment'

import { loadFromBgg } from '$lib/bgg/api'
import { validUserId } from '$lib/fn/validation'
import { createBoardgameState } from '$lib/state/boardgames.svelte'
import { createLoadingState, type LoadingState } from '$lib/state/loading.svelte'
import { error } from '@sveltejs/kit'

const loadBoardgames = async (userId: string, loadingState: LoadingState) => {
	if (!validUserId(userId)) {
		error(500, 'Cannot load boardgames')
	}
	if (browser) {
		const boardgameState = createBoardgameState()
		if (boardgameState.getUserId() !== userId || !boardgameState.getBoardgames().length) {
			boardgameState.clear()
			const { boardgames } = await loadFromBgg(userId, loadingState)
			boardgameState.load(boardgames, userId)
		}
		return boardgameState
	}
	return createBoardgameState()
}

export const load = async ({ params }) => {
	const userId = params.slug
	const loadingState = createLoadingState()
	if (!validUserId(userId)) {
		error(404, 'User cannot be found')
	}
	return {
		userId,
		boardgameState: loadBoardgames(userId, loadingState),
		loadingState
	}
}
