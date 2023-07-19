export type AcceptedMessage = {
	message: string
}

export type Boardgames = {
	items: Items
}

export type Items = {
	item: Item[]
}

export type Item = {
	id: string
	minplayers: { value: number }
	maxplayers: { value: number }
	playingtime: { value: number }
	description: string
	statistics: Statistics
}

export type Statistics = {
	ratings: Ratings
}

export type Ratings = {
	averageweight: { value: number }
}
