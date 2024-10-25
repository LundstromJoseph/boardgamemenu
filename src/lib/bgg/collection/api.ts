import { error } from '@sveltejs/kit';
import simpleXmlToJson from 'simple-xml-to-json';
import { parseBggCollectionResponse, type CollectionResponse } from './parsing';

const { convertXML } = simpleXmlToJson

const ACCEPTED = 202
const OK = 200

const collectionUrl = (userId: string) => `https://boardgamegeek.com/xmlapi2/collection?username=${userId}&own=1`


const promise = async (url: string): Promise<readonly [number, string]> => {
	return fetch(url).then(async (e) => [e.status, await e.text()] as const)
}

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
	const [status, response] = await promise(collectionUrl(userId))
	if (status === ACCEPTED) {
		await new Promise((res) => setTimeout(res, 500))
		return fetchCollection(userId)
	} else if (status === OK) {
		return parseCollection(response)
	} else {
		error(status, 'Could not get boardgames for user')
	}
}


