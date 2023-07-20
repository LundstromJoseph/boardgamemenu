import { error } from '@sveltejs/kit'
import { xml2json } from 'xml2json-light'
import type { Boardgames } from '../../../types/bgg/boardgames'
import type { Collection } from '../../../types/bgg/collection'
import type { Boardgame } from '../../../types/boardgames'

const ACCEPTED = 202
const OK = 200

const collectionUrl = (userId: string) =>
	`https://boardgamegeek.com/xmlapi2/collection?username=${userId}&own=1`

const boardgamesUrl = (ids: string[]) =>
	`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion,boardgameaccessory&stats=1&id=${ids.join(
		','
	)}`

const promise = async (url: string): Promise<readonly [number, string]> => {
	return fetch(url).then(async (e) => [e.status, await e.text()] as const)
}

const parseResponse = <T>(text: string): T => {
	const response: T = xml2json(text) as unknown as T
	return response
}

const chunkBoardgameIds = (ids: string[]) => {
	const chunkSize = 50
	const idChunks: string[][] = []
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize))
	}
	return idChunks
}

const loadBoardgames = async (ids: string[]): Promise<Boardgames> => {
	const [status, response] = await promise(boardgamesUrl(ids))
	if (status === ACCEPTED) {
		await new Promise((res) => setTimeout(res, 500))
		return loadBoardgames(ids)
	} else if (status === OK) {
		return parseResponse(response)
	} else {
		throw error(status, 'Could not get boardgames for user')
	}
}

const loadCollection = async (userId: string): Promise<Collection> => {
	const [status, response] = await promise(collectionUrl(userId))
	//const [status, response] = [200, MOCK_RESPONSE]
	if (status === ACCEPTED) {
		await new Promise((res) => setTimeout(res, 500))
		return loadCollection(userId)
	} else if (status === OK) {
		return parseResponse(response)
	} else {
		throw error(status, 'Could not get boardgames for user')
	}
}

const prepareStats = async (ids: string[]): Promise<Record<string, Boardgame['stats']>> => {
	const idChunks = chunkBoardgameIds(ids)
	const stats: Record<string, Boardgame['stats']> = {}
	for (const chunk of idChunks) {
		const boardgames = await loadBoardgames(chunk)
		for (const item of boardgames.items.item) {
			stats[item.id] = {
				complexityRating: Number(item.statistics.ratings.averageweight.value),
				gameLength: Number(item.playingtime.value),
				maxPlayers: Number(item.maxplayers.value),
				minPlayers: Number(item.minplayers.value)
			}
		}
	}
	return stats
}

export async function loadFromBgg(userId: string): Promise<{ boardgames: Boardgame[] }> {
	const collection = await loadCollection(userId)
	if (!collection) {
		throw error(500, 'Could not get boardgames for user')
	}
	const ids = collection.items.item.map((it) => it.objectid)
	const stats = await prepareStats(ids)

	return {
		boardgames: collection.items.item.map((it) => ({
			image: it.image,
			name: it.name['_@ttribute'],
			stats: stats[it.objectid]
		}))
	}
}
