import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import type { Boardgame } from '../types/boardgames'

const BOARDGAMES_KEY = 'boardgames'

export const boardgameStore = writable<Boardgame[]>([])

if (browser) {
	const stored = localStorage.getItem(BOARDGAMES_KEY)
	if (stored) {
		boardgameStore.set(JSON.parse(stored))
	}

	boardgameStore.subscribe((boardgames) =>
		localStorage.setItem(BOARDGAMES_KEY, JSON.stringify(boardgames))
	)
}
