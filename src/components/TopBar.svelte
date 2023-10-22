<script lang="ts">
	import { goto } from '$app/navigation'
	import { get } from 'svelte/store'
	import { boardgameStore } from '../store/boardgames'
	import TransparentButton from './TransparentButton.svelte'
	import Title from './typography/Title.svelte'

	const handleReload = () => {
		const userId = get(boardgameStore).userId
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
	$: boardgameCount = $boardgameStore.boardgames.length

	$: text = $boardgameStore.userId + (boardgameCount ? ` (${boardgameCount} games)` : '')
</script>

<div class="top-bar" style="--height: {0}px;">
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
