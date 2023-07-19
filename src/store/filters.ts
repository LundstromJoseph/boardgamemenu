import { writable } from 'svelte/store'
import type { Gamelength } from '../fn/gameLength'

export type StoredPlayerCount = number
export type StoredComplexity = readonly [number, number]
export type StoredGameLength = readonly [Gamelength, Gamelength]

export const playerCountStore = writable<StoredPlayerCount>(0)

export const complexityStore = writable<StoredComplexity>([0, 5])

export const gameLengthStore = writable<StoredGameLength>([15, 360])
