import { filterState } from '$lib/fn/filter'
import type { Boardgame, Range } from '$lib/types'
import { describe, it } from 'vitest'

const testBoardgame = (name: string, stats: Partial<Boardgame['stats']>) => {
	return {
		id: 'test',
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

describe('filter', () => {
	it('GIVEN difficult game WHEN filter easy games THEN dont show difficult game', async ({ expect }) => {
		//GIVEN
		const boardgames = [
			testBoardgame('easy game', { complexityRating: 1.1 }),
			testBoardgame('hard game', { complexityRating: 5 })
		]
		const complexity: Range = [0, 2]

		//WHEN
		const filteredBoardgames = filterState({ playerCount: 5, gameLength: [0, 1000], complexity, boardgames })

		//THEN
		expect(filteredBoardgames.length).toEqual(1)
		expect(filteredBoardgames[0].name).toEqual('easy game')
	})

	it('GIVEN game with complexity 1.5 WHEN filter exactly 1.5 THEN show game', async ({ expect }) => {
		//GIVEN
		const boardgames = [testBoardgame('game', { complexityRating: 1.5 })]
		const complexityHigherBound: Range = [0, 1.5]
		const complexityLowerBound: Range = [1.5, 5]

		//WHEN
		const filteredBoardgames1 = filterState({
			playerCount: 5,
			gameLength: [0, 1000],
			complexity: complexityHigherBound,
			boardgames
		})
		const filteredBoardgames2 = filterState({
			playerCount: 5,
			gameLength: [0, 1000],
			complexity: complexityLowerBound,
			boardgames
		})
		//THEN
		expect(filteredBoardgames1.length).toEqual(1)
		expect(filteredBoardgames1[0].name).toEqual('game')
		expect(filteredBoardgames2.length).toEqual(1)
		expect(filteredBoardgames2[0].name).toEqual('game')
	})
})
