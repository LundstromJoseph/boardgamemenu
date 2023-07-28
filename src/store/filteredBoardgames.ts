import { derived } from 'svelte/store'
import type { Boardgame, Range } from '../types/boardgames'
import { boardgameStore } from './boardgames'
import { complexity, isAny as isAnyComplexity } from './complexity'
import { gameLength, isAny as isAnyGameLength } from './gameLength'
import { isAny as isAnyPlayerCount, playerCount } from './playerCount'

export const filteredBoardgames = derived<
	[typeof boardgameStore, typeof complexity, typeof gameLength, typeof playerCount],
	Boardgame[]
>([boardgameStore, complexity, gameLength, playerCount], (values, set) => {
	const [boardgames, complexity, gameLength, playerCount] = values
	set(
		filter(
			{
				complexity,
				gameLength,
				playerCount
			},
			boardgames.boardgames
		)
	)
})

const withinRange = (target: number, range: readonly [number, number]) => {
	return target >= range[0] && target <= range[1]
}

const filter = (
	filters: {
		complexity: Range
		playerCount: number
		gameLength: Range
	},
	boardgames: Boardgame[]
) => {
	const filterFns: ((game: Boardgame) => boolean)[] = []
	if (!isAnyComplexity(filters.complexity)) {
		filterFns.push((game) => withinRange(game.stats.complexityRating, filters.complexity))
	}
	if (!isAnyPlayerCount(filters.playerCount)) {
		filterFns.push((game) =>
			withinRange(filters.playerCount, [game.stats.minPlayers, game.stats.maxPlayers])
		)
	}
	if (!isAnyGameLength(filters.gameLength)) {
		filterFns.push((game) => withinRange(game.stats.gameLength, filters.gameLength))
	}
	return boardgames.filter((game) => filterFns.every((fn) => fn(game)))
}
