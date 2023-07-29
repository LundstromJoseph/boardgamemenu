import { describe, it } from 'vitest'
import { complexity } from './complexity'
import { boardgameStore } from './boardgames'
import { get } from 'svelte/store'
import { filteredBoardgames } from './filteredBoardgames'

describe('filteredBoardgames', () => {
	it('Test', async ({ expect }) => {
		//GIVEN
		boardgameStore.set({
			userId: 'test',
			boardgames: [
				{
					image: 'none',
					name: 'easy boardgame',
					stats: {
						complexityRating: 1.1,
						gameLength: 15,
						maxPlayers: 1,
						minPlayers: 1
					}
				},
				{
					image: 'none',
					name: 'difficult boardgame',
					stats: {
						complexityRating: 4.8,
						gameLength: 15,
						maxPlayers: 1,
						minPlayers: 1
					}
				}
			]
		})

		//WHEN
		complexity.set([0, 2])

		//THEN
		const boardgames = get(filteredBoardgames)
		expect(boardgames.length).toEqual(1)
		expect(boardgames[0].name).toEqual('easy boardgame')
	})
})
