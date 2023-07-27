<script lang="ts">
	import { clickOutside } from '../directive/clickOutside'
	import { formatComplexityRange } from '../fn/complexity'
	import { formatGameLengthRange } from '../fn/gameLength'
	import { formatPlayerCount } from '../fn/playerCount'
	import { playerCountStore, complexityStore, gameLengthStore } from '../store/filters'
	import { COLORS } from '../theme/colors'
	import { BOTTOM_BAR_HEIGHT } from '../theme/sizes'
	import ComplexityPopup from './ComplexityPopup.svelte'
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

<div
	class="bottom-bar"
	style="--height: {BOTTOM_BAR_HEIGHT}px;"
	use:clickOutside
	on:outsideClicked={onClickOutside}
>
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
			text={formatPlayerCount($playerCountStore)}
		/>
		<SectionButton
			label={'Change complexity'}
			color={COLORS.FILTER.COMPLEXITY}
			icon={'fa-calculator'}
			text={formatComplexityRange($complexityStore)}
			on:click={() => handleClick('complexity')}
		/>
		<SectionButton
			label={'Change game length'}
			color={COLORS.FILTER.GAME_LENGTH}
			on:click={() => handleClick('game_length')}
			icon={'fa-clock'}
			text={formatGameLengthRange($gameLengthStore)}
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
