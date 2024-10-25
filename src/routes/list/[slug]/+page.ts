import { browser } from '$app/environment'

import { loadFromBgg } from '$lib/bgg/api'
import { boardgameStore } from '$lib/store/boardgames.svelte'
import { error } from '@sveltejs/kit'
import { validUserId } from '../../../lib/fn/validation'

export const _loadBoardgames = async (userId: string) => {
	if (browser) {
		const stored = boardgameStore.get()
		if (stored.userId !== userId || !stored.boardgames.length) {
			return loadAndSaveFromBgg(userId)
		}

		return { userId, boardgames: stored.boardgames }
	}
	return {
		userId,
		boardgames: []
	}
}

export const load = async ({ params }) => {
	const userId = params.slug
	if (!validUserId(userId)) {
		error(404, 'User cannot be found')
	}
	return {
		userId
	}
}

const loadAndSaveFromBgg = async (userId: string) => {
	if (!validUserId(userId)) {
		error(500, 'Cannot load boardgames')
	}
	const { boardgames } = await loadFromBgg(userId)
	boardgameStore.set({
		userId,
		boardgames
	})
	console.log(boardgames)
	return { userId, boardgames }
}
