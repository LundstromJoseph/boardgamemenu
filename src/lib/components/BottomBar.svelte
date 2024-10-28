<script lang="ts">
	import { type BoardgameState } from '../state/boardgames.svelte'
	import { COLORS } from '../theme/colors'
	import FilterMenu from './FilterMenu/FilterMenu.svelte'
	import FilterMenuButton from './FilterMenu/FilterMenuButton.svelte'
	import Title from './typography/Title.svelte'

	interface Props {
		boardgameState: BoardgameState
	}

	let { boardgameState }: Props = $props()

	let menuOpen: boolean = $state(false)

	let boardgameCount = $derived(boardgameState.getBoardgames().length)

	let filteredCount = $derived(boardgameState.getBoardgames(true).length)

	let text = $derived(boardgameCount ? `${filteredCount}/${boardgameCount} games visible` : '')

	const onOutsideClicked = () => {
		menuOpen = false
	}
</script>

<div class="bottom-bar" style="background-color: {COLORS.SURFACE};">
	<div class="content">
		<Title>{boardgameState.getUserId() ?? ''}</Title>
		<Title>{text}</Title>
	</div>
</div>
<FilterMenuButton onClick={() => (menuOpen = !menuOpen)} />
{#if menuOpen}
	<FilterMenu {boardgameState} {onOutsideClicked} />
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
