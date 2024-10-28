import { callBggWithRetry } from '$lib/bgg/util'
import simpleXmlToJson from 'simple-xml-to-json'
import { parseBggBoardgameStatsResponse, type StatsResponse } from './parsing'

const { convertXML } = simpleXmlToJson

const boardgamesUrl = (ids: string[]) =>
	`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion,boardgameaccessory&stats=1&id=${ids.join(
		','
	)}`

const chunkBoardgameIds = (ids: string[]) => {
	const chunkSize = 20 //BGG limit
	const idChunks: string[][] = []
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize))
	}
	return idChunks
}

export const fetchStats = async (ids: string[], cb: (chunkComplete: number) => void): Promise<StatsResponse[]> => {
	const chunks = chunkBoardgameIds(ids)

	let stats: StatsResponse[] = []

	for (const chunk of chunks) {
		const bggResponse = await callBggWithRetry(boardgamesUrl(chunk))
		const chunkStats = parseResponse(bggResponse)
		cb(chunkStats.length)
		stats = [...stats, ...chunkStats]
	}
	return stats
}

const parseResponse = (text: string): StatsResponse[] => {
	const response = convertXML(text)
	return parseBggBoardgameStatsResponse(response)
}
