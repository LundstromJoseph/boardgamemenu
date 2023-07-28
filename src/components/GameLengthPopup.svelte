<script lang="ts">
	import { gameLength, formatMinutes, HIGHEST_STEP, LOWEST_STEP } from '../store/gameLength'

	import { COLORS } from '../theme/colors'
	import type { Range } from '../types/boardgames'
	import FilterPopup from './FilterPopup.svelte'
	import TwoPointSlider from './TwoPointSlider.svelte'
	import Title from './typography/Title.svelte'

	let range: Range = [LOWEST_STEP, HIGHEST_STEP]

	function save(range: Range) {
		gameLength.set(range)
	}
</script>

<FilterPopup>
	<Title slot="title" color={COLORS.ON_SURFACE}>Gamelength</Title>
	<div class="slider-container" slot="options">
		<TwoPointSlider
			min={LOWEST_STEP}
			max={HIGHEST_STEP}
			stepSize={15}
			bind:range
			accentColor={COLORS.FILTER.GAME_LENGTH}
			onEnd={save}
		/>

		<div style="flex-grow: 1;">
			<Title align="end" color={COLORS.ON_SURFACE}>{formatMinutes(range[0])}</Title>
		</div>
		<Title color={COLORS.ON_SURFACE}>-</Title>
		<div style="flex-grow: 1;">
			<Title align="start" color={COLORS.ON_SURFACE}>{formatMinutes(range[1])}</Title>
		</div>
	</div>
</FilterPopup>

<style>
	.slider-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
