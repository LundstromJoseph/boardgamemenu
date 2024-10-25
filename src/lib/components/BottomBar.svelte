<script lang="ts">
	import { boardgameStore } from '../store/boardgames.svelte'
	import { COLORS } from '../theme/colors'
	import FilterMenu from './FilterMenu/FilterMenu.svelte'
	import FilterMenuButton from './FilterMenu/FilterMenuButton.svelte'
	import Title from './typography/Title.svelte'

	let menuOpen: boolean = $state(false)

	let boardgameCount = $derived(boardgameStore.get().boardgames.length)

	let filteredCount = $derived(boardgameStore.getFiltered().length)

	let text = $derived(boardgameCount ? `${filteredCount}/${boardgameCount} games visible` : '')

	const onOutsideClicked = () => {
		menuOpen = false
	}
</script>

<div class="bottom-bar" style="background-color: {COLORS.SURFACE};">
	<div class="content">
		<Title>{boardgameStore.get().userId ?? ''}</Title>
		<Title>{text}</Title>
	</div>
</div>
<FilterMenuButton onClick={() => (menuOpen = !menuOpen)} />
{#if menuOpen}
	<FilterMenu {onOutsideClicked} />
{/if}

<style>
	.bottom-bar {
		position: fixed;
		bottom: 0;
		backdrop-filter: blur(4px);
		left: 0;
		height: 30px;
		width: 100%;
		z-index: 90;
		transform-origin: 50% 0%;
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
