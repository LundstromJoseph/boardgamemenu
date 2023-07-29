import { describe, it } from 'vitest'
import { complexity } from './complexity'
import { boardgameStore } from './boardgames'
import { get } from 'svelte/store'
import { filteredBoardgames } from './filteredBoardgames'
import type { Boardgame } from '../types/boardgames'

const testBoardgame = (name: string, stats: Partial<Boardgame['stats']>) => {
	return {
		image: 'none',
		name,
		stats: {
			complexityRating: stats.complexityRating ?? 1,
			gameLength: stats.gameLength ?? 15,
			maxPlayers: stats.maxPlayers ?? 10,
			minPlayers: stats.minPlayers ?? 1
		}
	}
}

describe('filteredBoardgames', () => {
	it('GIVEN difficult game WHEN filter easy games THEN dont show difficult game', async ({
		expect
	}) => {
		//GIVEN
		boardgameStore.set({
			userId: 'test',
			boardgames: [
				testBoardgame('easy game', { complexityRating: 1.1 }),
				testBoardgame('hard game', { complexityRating: 5 })
			]
		})

		//WHEN
		complexity.set([0, 2])

		//THEN
		const boardgames = get(filteredBoardgames)
		expect(boardgames.length).toEqual(1)
		expect(boardgames[0].name).toEqual('easy game')
	})

	it('GIVEN game with complexity 1.5 WHEN filter exactly 1.5 THEN show game', async ({
		expect
	}) => {
		//GIVEN
		boardgameStore.set({
			userId: 'test',
			boardgames: [testBoardgame('game', { complexityRating: 1.5 })]
		})

		//WHEN
		complexity.set([0, 1.5])

		//THEN
		let boardgames = get(filteredBoardgames)
		expect(boardgames.length).toEqual(1)
		expect(boardgames[0].name).toEqual('game')

		//WHEN
		complexity.set([1.5, 5])

		//THEN
		boardgames = get(filteredBoardgames)
		expect(boardgames.length).toEqual(1)
		expect(boardgames[0].name).toEqual('game')
	})
})
