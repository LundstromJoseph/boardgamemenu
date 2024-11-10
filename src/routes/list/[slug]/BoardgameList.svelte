<script lang="ts">
	import BottomBar from '$lib/components/BottomBar.svelte'
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte'
	import { type BoardgameState } from '$lib/state/boardgames.svelte'
	import { BOTTOM_BAR_HEIGHT } from '$lib/theme/sizes'
	import BoardgameView from './BoardgameView.svelte'

	interface Props {
		boardgameState: BoardgameState
	}

	let { boardgameState }: Props = $props()
</script>

<SideMenu {boardgameState} />
<div class="result-container">
	{#each boardgameState.getBoardgames(true) as item}
		<BoardgameView {item} />
	{/each}
</div>

<style>
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
		row-gap: 1em;
		column-gap: 0.3em;
	}

	@media (min-width: 800px) {
		.result-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
