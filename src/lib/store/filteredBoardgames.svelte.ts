import type { Boardgame, Range } from '$lib/types'
import { isAny as isAnyComplexity } from './complexity.svelte'
import { isAny as isAnyGameLength } from './gameLength.svelte'
import { isAny as isAnyPlayerCount } from './playerCount.svelte'

export const filterState = ({
	complexity,
	gameLength,
	playerCount,
	boardgames
}: {
	complexity: Range
	gameLength: Range
	playerCount: number
	boardgames: Boardgame[]
}) => {
	const filterFns: ((game: Boardgame) => boolean)[] = []
	if (!isAnyComplexity(complexity)) {
		filterFns.push((game) => withinRange(game.stats.complexityRating, complexity))
	}
	if (!isAnyPlayerCount(playerCount)) {
		filterFns.push((game) => {
			return withinRange(playerCount, [game.stats.minPlayers, game.stats.maxPlayers])
		})
	}
	if (!isAnyGameLength(gameLength)) {
		filterFns.push((game) => withinRange(game.stats.gameLength, gameLength))
	}
	return boardgames.filter((game) => filterFns.every((fn) => fn(game)))
}

const withinRange = (target: number, range: readonly [number, number]) => {
	return target >= range[0] && target <= range[1]
}
