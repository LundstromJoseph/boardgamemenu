import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'
import { getUserId } from '../store/userId'

const userId = 'USER_ID'

const promise = async (): Promise<string | null> => {
	if (browser) {
		return getUserId()
	}
	return null
}

export const _handleSubmit = () => {
	localStorage.setItem(userId, 'jostrom')
}

export async function load() {
	const userId = await promise()
	if (userId) {
		throw redirect(302, `/load?userId=${userId}`)
	}
}
