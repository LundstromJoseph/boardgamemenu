<script lang="ts">
	import Fab from '../routes/list/[slug]/Fab.svelte'
	import { complexity, formatComplexityForBottomBar } from '../store/complexity'
	import { formatGameLengthForBottomBar, gameLength } from '../store/gameLength'
	import { formatPlayerCountForBottomBar, playerCount } from '../store/playerCount'
	import { COLORS } from '../theme/colors'
	import { BOTTOM_BAR_HEIGHT } from '../theme/sizes'
	import ComplexityPopup from './ComplexityPopup.svelte'
	import FilterMenu from './FilterMenu/FilterMenu.svelte'
	import GameLengthPopup from './GameLengthPopup.svelte'
	import PlayerCountPopup from './PlayerCountPopup.svelte'
	import SectionButton from './SectionButton.svelte'

	type Setting = undefined | 'player_count' | 'complexity' | 'game_length'

	let setting: Setting

	function handleClick(newValue: typeof setting) {
		if (!newValue || setting === newValue) {
			setting = undefined
		} else {
			setting = newValue
		}
	}

	function onClickOutside() {
		setting = undefined
	}
</script>

<Fab onClick={() => handleClick('player_count')} />
{#if 'player_count' === setting}
	<FilterMenu />
{/if}

<div class="bottom-bar" style="--height: {BOTTOM_BAR_HEIGHT}px; display: none;">
	<div class="content">
		{#if 'player_count' === setting}
			<PlayerCountPopup />
		{:else if 'complexity' === setting}
			<ComplexityPopup />
		{:else if 'game_length' === setting}
			<GameLengthPopup />
		{/if}
		<SectionButton
			label={'Change player count'}
			color={COLORS.FILTER.PLAYER_COUNT}
			on:click={() => handleClick('player_count')}
			icon="fa-users"
			text={formatPlayerCountForBottomBar($playerCount)}
		/>
		<SectionButton
			label={'Change complexity'}
			color={COLORS.FILTER.COMPLEXITY}
			icon={'fa-calculator'}
			text={formatComplexityForBottomBar($complexity)}
			on:click={() => handleClick('complexity')}
		/>
		<SectionButton
			label={'Change game length'}
			color={COLORS.FILTER.GAME_LENGTH}
			on:click={() => handleClick('game_length')}
			icon={'fa-clock'}
			text={formatGameLengthForBottomBar($gameLength)}
		/>
	</div>
</div>

<style>
	.bottom-bar {
		position: fixed;
		bottom: 0;
		background-color: black;
		left: 0;
		height: var(--height);
		width: 100%;
		z-index: 99;
		transform-origin: 50% 0%;
		border-top: 1px solid white;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: 100%;
		z-index: 97;
	}
</style>
