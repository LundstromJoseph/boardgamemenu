import * as v from 'valibot'

const MinPlayerSchema = v.object({
	minplayers: v.object({
		value: v.string()
	})
})
const MaxPlayerSchema = v.object({
	maxplayers: v.object({
		value: v.string()
	})
})

const PlayingTimeSchema = v.object({
	playingtime: v.object({
		value: v.string()
	})
})

const AverageWeightSchema = v.object({
	averageweight: v.object({
		value: v.string()
	})
})

const RatingsChildrenSchema = v.fallback(v.union([AverageWeightSchema, v.undefined()]), undefined)

export type RatingsChildren = v.InferInput<typeof RatingsChildrenSchema>

const RatingsSchema = v.object({
	ratings: v.object({
		children: v.array(RatingsChildrenSchema)
	})
})

const StatisticsChildrenSchema = v.fallback(v.union([RatingsSchema, v.undefined()]), undefined)

export type StatisticsChildren = v.InferInput<typeof StatisticsChildrenSchema>

const StatisticsSchema = v.object({
	statistics: v.object({
		children: v.array(StatisticsChildrenSchema)
	})
})

export const BoardgameChildrenSchema = v.fallback(
	v.union([MinPlayerSchema, MaxPlayerSchema, PlayingTimeSchema, StatisticsSchema, v.undefined()]),
	undefined
)

export type BoardgameChildren = v.InferInput<typeof BoardgameChildrenSchema>

export const BoardgameSchema = v.object({
	type: v.union([v.literal('boardgame'), v.literal('boardgameexpansion')]),
	id: v.string(),
	children: v.array(BoardgameChildrenSchema)
})

export type BoardgameItem = v.InferInput<typeof BoardgameSchema>

export const BggBoardgameSchema = v.object({
	items: v.object({
		children: v.array(
			v.object({
				item: v.fallback(v.union([BoardgameSchema, v.undefined()]), undefined)
			})
		)
	})
})
