import { error } from '@sveltejs/kit'

const promiseCall = async (url: string) => {
	return fetch(url)
		.then(async (e) => [e.status, await e.text()] as const)
		.catch(async () => [CONFLICT, ''] as const)
}

export const callBggWithRetry = async (
	url: string,
	rateLimits = 0
): Promise<[string, 'OK'] | [undefined, 'RATE_LIMITED']> => {
	const [status, response] = await promiseCall(url)
	if (status === ACCEPTED) {
		await new Promise((res) => setTimeout(res, 500))
		return callBggWithRetry(url, rateLimits)
	} else if (status === OK) {
		return [response, 'OK']
	} else if (status === RATE_LIMITED || status === CONFLICT) {
		return [undefined, 'RATE_LIMITED']
	} else {
		throw error(status, 'Could not get boardgames for user')
	}
}

const RATE_LIMITED = 429
const ACCEPTED = 202
const OK = 200
const CONFLICT = 409
