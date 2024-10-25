import { isAny as isAnyComplexity } from '$lib/store/complexity.svelte'
import { isAny as isAnyGameLength } from '$lib/store/gameLength.svelte'
import { isAny as isAnyPlayerCount } from '$lib/store/playerCount.svelte'
import type { Boardgame, Range } from '$lib/types'

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
