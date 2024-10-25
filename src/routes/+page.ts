import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'
import { validUserId } from '../lib/fn/validation'
import { boardgameStore } from '../lib/store/boardgames.svelte'

export const _handleSubmit = async (event: Event & { currentTarget: EventTarget & HTMLFormElement }) => {
	event.preventDefault()
	event.stopPropagation()
	const value = event.currentTarget.username.value
	if (!validUserId(value)) {
		error(400, 'The username must start with a letter, and may contain only letters, numbers and underscores.')
	}
	await goto(`/list/${value}`)
}

export const load = () => {
	const data = boardgameStore.get()
	if (data && data.userId && validUserId(data.userId)) {
		goto(`/list/${data.userId}`)
	}
}
