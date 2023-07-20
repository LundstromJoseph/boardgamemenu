import { browser } from '$app/environment'
import { get } from 'svelte/store'
import { boardgameStore } from '../../../store/boardgames'
import { loadFromBgg } from './loadFromBgg'

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
	return {
		userId: params.slug
	}
}

const loadAndSaveFromBgg = async (userId: string) => {
	const { boardgames } = await loadFromBgg(userId)
	boardgameStore.set({
		userId,
		boardgames
	})
	return { userId, boardgames }
}
