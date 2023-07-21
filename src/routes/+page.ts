import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'
import { get } from 'svelte/store'
import { validUserId } from '../fn/validation'
import { boardgameStore } from '../store/boardgames'

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

export const load = () => {
	const data = get(boardgameStore)
	if (data && data.userId && validUserId(data.userId)) {
		goto(`/list/${data.userId}`)
	}
}
