import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'
import { validUserId } from '../fn/validation'

export const _handleSubmit = async (
	event: Event & { currentTarget: EventTarget & HTMLFormElement }
) => {
	event.preventDefault()
	event.stopPropagation()
	const value = event.currentTarget.username.value
	if (!validUserId(value)) {
		throw error(
			400,
			'The username must start with a letter, and may contain only letters, numbers and underscores.'
		)
	}
	await goto(`/list/${value}`)
}
