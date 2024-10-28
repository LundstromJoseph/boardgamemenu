import { error } from '@sveltejs/kit'

const promiseCall = async (url: string) => {
	return fetch(url)
		.then(async (e) => [e.status, await e.text()] as const)
		.catch(async () => [CONFLICT, ''] as const)
}

export const callBggWithRetry = async (url: string, rateLimits = 0): Promise<string> => {
	const [status, response] = await promiseCall(url)
	if (status === ACCEPTED) {
		await new Promise((res) => setTimeout(res, 500))
		return callBggWithRetry(url, rateLimits)
	} else if (status === OK) {
		return response
	} else if (status === RATE_LIMITED || status === CONFLICT) {
		// Exponential backoff
		const delay = 1.5 * 1.3 ** Math.min(rateLimits, 4)
		await new Promise((res) => setTimeout(res, delay * 1000))
		return callBggWithRetry(url, rateLimits + 1)
	} else {
		throw error(status, 'Could not get boardgames for user')
	}
}

const RATE_LIMITED = 429
const ACCEPTED = 202
const OK = 200
const CONFLICT = 409
