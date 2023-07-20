import { isAny as isAnyComplexity } from './complexity'
import { isAny as isAnyGameLength } from './gameLength'
import { isAny as isAnyPlayerCount } from './playerCount'
import type { StoredComplexity, StoredGameLength, StoredPlayerCount } from '../store/filters'
import type { Boardgame } from '../types/boardgames'

const withinRange = (target: number, range: readonly [number, number]) => {
	return target >= range[0] && target <= range[1]
}

export const filter = (
	filters: {
		complexity: StoredComplexity
		playerCount: StoredPlayerCount
		gameLength: StoredGameLength
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
