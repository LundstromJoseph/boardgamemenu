export type AcceptedMessage = {
	message: string
}

export type Boardgames = {
	items: Items
}

export type Items = {
	item: Item[]
	[x: string | number | symbol]: unknown
}

export type Item = {
	id: string
	minplayers: { value: number }
	maxplayers: { value: number }
	playingtime: { value: number }
	description: string
	statistics: Statistics
	[x: string | number | symbol]: unknown
}

export type Statistics = {
	ratings: Ratings
	[x: string | number | symbol]: unknown
}

export type Ratings = {
	averageweight: { value: number }
	[x: string | number | symbol]: unknown
}
