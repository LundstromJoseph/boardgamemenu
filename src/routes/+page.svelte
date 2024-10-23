<script lang="ts">
	import { fade, slide } from 'svelte/transition'
	import RoundButton from '../components/RoundButton.svelte'
	import BigHeader from '../components/typography/BigHeader.svelte'
	import Header from '../components/typography/Header.svelte'
	import { _handleSubmit } from './+page'
	import { onMount } from 'svelte'
	import Text from '../components/typography/Text.svelte'
	import { COLORS } from '../theme/colors'

	let mounted = $state(false)
	interface Props {
		username?: string;
	}

	let { username = $bindable('') }: Props = $props();

	const duration = 1500
	const delay = 600

	onMount(() => {
		mounted = true
	})

	let errorMessage: string = $state()

	const submit = (event: Event & { currentTarget: EventTarget & HTMLFormElement }) => {
		_handleSubmit(event).catch((e) => {
			errorMessage = e.body.message
		})
	}
</script>

{#if mounted}
	<form
		onsubmit={submit}
		style="display: flex; justify-content: center;"
		out:fade={{ duration: 500 }}
	>
		<div class="container">
			<div in:fade={{ delay: delay * 0, duration: duration + delay * 3 }}>
				<BigHeader>Hello</BigHeader>
			</div>
			<div in:fade={{ delay: delay * 1, duration: duration + delay * 2 }}>
				<Header>Enter your boardgamegeek.com username to download your collection.</Header>
			</div>
			<div in:fade={{ delay: delay * 2, duration: duration + delay * 1 }}>
				<input bind:value={username} class="input" id="username" />
			</div>
			{#if errorMessage}
				<div>
					<Text color={COLORS.ERROR}>{errorMessage}</Text>
				</div>
			{/if}
			<div in:fade={{ delay: delay * 3, duration: duration + delay * 0 }}>
				<div class="button-wrapper">
					<RoundButton label="submit-username" type="submit"
						><i class="fa-solid fa-arrow-right fa-xl"></i></RoundButton
					>
				</div>
			</div>
		</div>
	</form>
{/if}

<style>
	.container {
		width: 100%;
		max-width: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 24px;
		flex-direction: column;
	}

	.button-wrapper {
		width: 76px;
		height: 76px;
	}

	.input {
		border: 0;
		border-radius: 12px;
		padding: 24px;
		background-color: #444;
		outline: none;
		color-scheme: dark;
		font-size: x-large;
	}

	.input:active {
		appearance: none;
		border: 0;
		outline: none;
	}

	.input::before {
		content: 'BGG username';
		display: inline;
		position: absolute;
		width: 100px;
		height: 100px;
		top: 0;
		right: 0;
	}
</style>
