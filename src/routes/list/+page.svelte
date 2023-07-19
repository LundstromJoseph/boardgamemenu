<script lang="ts">
	import BottomBar from '../../components/BottomBar.svelte'
	import { boardgameStore } from '../../store/boardgames'
	import type { StoredComplexity, StoredGameLength, StoredPlayerCount } from '../../store/filters'
	import { complexityStore, gameLengthStore, playerCountStore } from '../../store/filters'
	import { BOTTOM_BAR_HEIGHT } from '../../theme/sizes'
	import type { Boardgame } from '../../types/boardgames'

	import { isAny as isAnyComplexity } from '../../fn/complexity'
	import { isAny as isAnyGameLength } from '../../fn/gameLength'
	import { isAny as isAnyPlayerCount } from '../../fn/playerCount'
	import BoardgameView from './BoardgameView.svelte'

	const withinRange = (target: number, range: readonly [number, number]) => {
		return target >= range[0] && target <= range[1]
	}

	const filter = (
		filters: {
			complexity: StoredComplexity
			playerCount: StoredPlayerCount
			gameLength: StoredGameLength
		},
		boardgames: Boardgame[]
	) => {
		const filterFns: ((game: Boardgame) => boolean)[] = []
		if (!isAnyComplexity(filters.complexity)) {
			filterFns.push((game) => withinRange(game.stats.complexityRating, filters.complexity))
		}
		if (!isAnyPlayerCount(filters.playerCount)) {
			filterFns.push((game) =>
				withinRange(filters.playerCount, [game.stats.minPlayers, game.stats.maxPlayers])
			)
		}
		if (!isAnyGameLength(filters.gameLength)) {
			filterFns.push((game) => withinRange(game.stats.gameLength, filters.gameLength))
		}
		return boardgames.filter((game) => filterFns.every((fn) => fn(game)))
	}

	$: boardgames = filter(
		{
			complexity: $complexityStore,
			gameLength: $gameLengthStore,
			playerCount: $playerCountStore
		},
		$boardgameStore
	)
</script>

<BottomBar />
<div class="result-container" style="--bottom-bar-height: {BOTTOM_BAR_HEIGHT}px">
	{#each boardgames as item}
		<BoardgameView {item} />
	{/each}
</div>

<style>
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
		gap: 0.3em;
		padding-bottom: var(--bottom-bar-height);
	}

	@media (min-width: 800px) {
		.result-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
