export const HIGHEST_PLAYER_COUNT = 20

export const playerCountState = () => {
	let state = $state<number>(0)
	return {
		get: () => state,
		set: (value: number) => (state = value),
		isAny: () => isAny(state)
	}
}

export const isAny = (playerCount: number) => {
	return playerCount === 0
}
