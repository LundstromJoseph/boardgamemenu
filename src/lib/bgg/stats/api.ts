import { callBggWithRetry } from '$lib/bgg/util'
import type { OneOf } from '$lib/types'
import simpleXmlToJson from 'simple-xml-to-json'
import { parseBggBoardgameStatsResponse, type StatsResponse } from './parsing'

const { convertXML } = simpleXmlToJson

const boardgamesUrl = (ids: string[]) =>
	`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion,boardgameaccessory&stats=1&id=${ids.join(
		','
	)}`

export const fetchStats = async (ids: string[]): Promise<OneOf<StatsResponse[], 'RATE_LIMITED'>> => {
	const [bggResponse, error] = await callBggWithRetry(boardgamesUrl(ids))
	if (error === 'RATE_LIMITED') {
		return [undefined, 'RATE_LIMITED']
	}
	const chunkStats = parseResponse(bggResponse)
	return [chunkStats, undefined]
}

const parseResponse = (text: string): StatsResponse[] => {
	const response = convertXML(text)
	return parseBggBoardgameStatsResponse(response)
}
