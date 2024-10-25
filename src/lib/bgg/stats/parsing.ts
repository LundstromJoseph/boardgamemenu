import type { Boardgame } from '$lib/types'
import * as v from 'valibot'
import {
	BggBoardgameSchema,
	type BoardgameChildren,
	type BoardgameItem,
	type RatingsChildren,
	type StatisticsChildren
} from './schema'

export type StatsResponse = { stats: Boardgame['stats']; id: string }

const wrongFormat = (text: string) => {
	return new Error('Wrong format: ' + text)
}

export const parseBggBoardgameStatsResponse = (ast: object): StatsResponse[] => {
	const result = v.safeParse(BggBoardgameSchema, ast)

	if (!result.success) {
		throw wrongFormat('Invalid format')
	}
	const output = result.output

	const stats = output.items.children
		.map((item) => item.item)
		.filter((item) => item !== undefined)
		.map(parseBoardgame)

	return stats
}

const parseBoardgame = (boardgame: BoardgameItem) => {
	const minPlayers = findFromChildren(boardgame.children, 'minplayers')
	const maxPlayers = findFromChildren(boardgame.children, 'maxplayers')
	const playingTime = findFromChildren(boardgame.children, 'playingtime')
	const statistics = findFromChildren(boardgame.children, 'statistics')

	const ratings = statistics.length > 0 ? findFromChildren(statistics[0].children, 'ratings') : []
	const weight = ratings.length > 0 ? findFromChildren(ratings[0].children, 'averageweight') : []

	return {
		stats: {
			minPlayers: Number(minPlayers[0]?.value),
			maxPlayers: Number(maxPlayers[0]?.value),
			gameLength: Number(playingTime[0]?.value),
			complexityRating: Number(weight[0]?.value)
		},
		id: boardgame.id
	}
}

type KeysOfUnion<T> = T extends T ? keyof T : never

const findFromChildren = <T extends BoardgameChildren | StatisticsChildren | RatingsChildren, K extends KeysOfUnion<T>>(
	array: T[],
	key: K
): T extends { [key in K]: unknown } ? T[K][] : [] => {
	return (
		array
			.filter((it) => it !== undefined)
			.filter((it) => key in it)
			.map((it) => it as Record<K, T>)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.map((it) => it[key]) as any
	)
}
