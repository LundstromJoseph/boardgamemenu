import { error } from '@sveltejs/kit'
import simpleXmlToJson from 'simple-xml-to-json'
import { parseBggBoardgameStatsResponse, type StatsResponse } from './parsing'

const { convertXML } = simpleXmlToJson

const boardgamesUrl = (ids: string[]) =>
	`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion,boardgameaccessory&stats=1&id=${ids.join(
		','
	)}`

const promise = async (url: string): Promise<readonly [number, string]> => {
	return fetch(url).then(async (e) => [e.status, await e.text()] as const)
}

const chunkBoardgameIds = (ids: string[]) => {
	const chunkSize = 20 //BGG limit
	const idChunks: string[][] = []
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize))
	}
	return idChunks
}

export const fetchStats = async (ids: string[]): Promise<StatsResponse[]> => {
	const chunks = chunkBoardgameIds(ids)

	let stats: StatsResponse[] = []

	for (const chunk of chunks) {
		stats = [...stats, ...(await loadBoardgames(chunk))]
		await new Promise((res) => setTimeout(res, 5000))
	}
	return stats
}

const parseResponse = (text: string): StatsResponse[] => {
	const response = convertXML(text)
	return parseBggBoardgameStatsResponse(response)
}

const loadBoardgames = async (ids: string[]): Promise<StatsResponse[]> => {
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

const ACCEPTED = 202
const OK = 200
