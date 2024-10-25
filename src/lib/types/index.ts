export type Boardgame = {
	id: string
	name: string
	image: string
	stats: {
		complexityRating: number
		minPlayers: number
		maxPlayers: number
		gameLength: number
	}
}

export type Range = readonly [number, number]
