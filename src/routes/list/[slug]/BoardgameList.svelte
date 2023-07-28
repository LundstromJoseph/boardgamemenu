<script lang="ts">
	import BottomBar from '../../../components/BottomBar.svelte'
	import TopBar from '../../../components/TopBar.svelte'
	import { filteredBoardgames } from '../../../store/filteredBoardgames'
	import { BOTTOM_BAR_HEIGHT, TOP_BAR_HEIGHT } from '../../../theme/sizes'
	import BoardgameView from './BoardgameView.svelte'
</script>

<TopBar />
<BottomBar />
<div
	class="result-container"
	style="--bottom-bar-height: {BOTTOM_BAR_HEIGHT}px; --top-bar-height: {TOP_BAR_HEIGHT}px"
>
	{#each $filteredBoardgames as item}
		<BoardgameView {item} />
	{/each}
</div>

<style>
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
		gap: 0.3em;
		padding-bottom: var(--bottom-bar-height);
		padding-top: var(--top-bar-height);
	}

	@media (min-width: 800px) {
		.result-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
