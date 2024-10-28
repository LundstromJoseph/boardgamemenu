import { callBggWithRetry } from '$lib/bgg/util'
import { error } from '@sveltejs/kit'
import simpleXmlToJson from 'simple-xml-to-json'
import { parseBggCollectionResponse, type CollectionResponse } from './parsing'

const { convertXML } = simpleXmlToJson

const collectionUrl = (userId: string) => `https://boardgamegeek.com/xmlapi2/collection?username=${userId}&own=1`

const parseCollection = (text: string): CollectionResponse => {
	const response = convertXML(text)
	try {
		return parseBggCollectionResponse(response)
	} catch (e) {
		console.error('Could not parse collection', e)
		throw error(500, 'Could not parse collection')
	}
}

export const fetchCollection = async (userId: string): Promise<CollectionResponse> => {
	const response = await callBggWithRetry(collectionUrl(userId))
	return parseCollection(response)
}
