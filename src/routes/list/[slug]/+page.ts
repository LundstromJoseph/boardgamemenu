import { browser } from '$app/environment'
import { get } from 'svelte/store'
import { boardgameStore } from '../../../store/boardgames'
import { loadFromBgg } from './loadFromBgg'
import { validUserId } from '../../../fn/validation'
import { error } from '@sveltejs/kit'

export const _loadBoardgames = async (userId: string) => {
	if (browser) {
		const stored = get(boardgameStore)
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
		error(404, 'User cannot be found');
	}
	return {
		userId
	}
}

const loadAndSaveFromBgg = async (userId: string) => {
	if (!validUserId(userId)) {
		error(500, 'Cannot load boardgames');
	}
	const { boardgames } = await loadFromBgg(userId)
	boardgameStore.set({
		userId,
		boardgames
	})
	return { userId, boardgames }
}
