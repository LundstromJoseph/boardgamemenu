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

export type State<T> = {
	set: (newState: T) => void
	get: () => T
}

export type OneOf<T1, T2> = [T1, undefined] | [undefined, T2]
