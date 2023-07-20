<script lang="ts">
	import { goto } from '$app/navigation'
	import { boardgameStore } from '../store/boardgames'
	import { TOP_BAR_HEIGHT } from '../theme/sizes'
	import TransparentButton from './TransparentButton.svelte'
	import Title from './typography/Title.svelte'

	export let userId: string
	export let boardgameCount: number

	const handleReload = () => {
		boardgameStore.set({
			userId: undefined,
			boardgames: []
		})
		goto(`/list/${userId}`, { invalidateAll: true })
	}

	const handleLogout = () => {
		boardgameStore.set({
			userId: undefined,
			boardgames: []
		})
		goto('/')
	}

	$: text = userId + (boardgameCount ? ` (${boardgameCount} games)` : '')
</script>

<div class="top-bar" style="--height: {TOP_BAR_HEIGHT}px;">
	<div class="content">
		<Title>{text}</Title>
		<div class="icons">
			<TransparentButton on:click={handleReload}>
				<i style="color: white;" class="fa-solid fa-rotate-right fa-xl" />
			</TransparentButton>
			<TransparentButton on:click={handleLogout}>
				<i style="color: white;" class="fa-solid fa-right-from-bracket fa-xl" />
			</TransparentButton>
		</div>
	</div>
</div>

<style>
	.icons {
		display: flex;
		gap: 1em;
	}
	.top-bar {
		position: fixed;
		top: 0;
		background-color: black;
		left: 0;
		height: var(--height);
		width: 100%;
		z-index: 99;
		transform-origin: 50% 0%;
		border-bottom: 1px solid white;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		z-index: 97;
		padding-left: 6px;
		padding-right: 6px;
	}
</style>
