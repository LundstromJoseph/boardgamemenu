import { goto } from '$app/navigation'

export const _handleSubmit = async (
	event: Event & { currentTarget: EventTarget & HTMLFormElement }
) => {
	event.preventDefault()
	event.stopPropagation()
	await goto(`/list/${event.currentTarget.username.value}`)
}
