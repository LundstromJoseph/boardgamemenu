<script lang="ts">
	import BottomBar from '../../../components/BottomBar.svelte'
	import { filteredBoardgames } from '../../../store/filteredBoardgames'
	import { BOTTOM_BAR_HEIGHT } from '../../../theme/sizes'
	import BoardgameView from './BoardgameView.svelte'
</script>

<BottomBar />
<div class="result-container" style="--bottom-bar-height: {BOTTOM_BAR_HEIGHT}px;">
	{#each $filteredBoardgames as item}
		<BoardgameView {item} />
	{/each}
</div>

<style>
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
		row-gap: 1em;
		column-gap: 0.3em;
		padding-bottom: var(--bottom-bar-height);
	}

	@media (min-width: 800px) {
		.result-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
