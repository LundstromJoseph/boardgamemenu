<script lang="ts">
	import { HIGHEST_STEP, LOWEST_STEP, formatMinutes, gameLength } from '../../store/gameLength'
	import { COLORS } from '../../theme/colors'
	import type { Range } from '../../types/boardgames'
	import TwoPointSlider from '../TwoPointSlider.svelte'
	import Title from '../typography/Title.svelte'

	let range: Range = [$gameLength[0], $gameLength[1]]

	function save(range: Range) {
		gameLength.set(range)
	}
</script>

<div>
	<div>
		<Title color={COLORS.ON_SURFACE}>Gamelength</Title>
	</div>
	<div>
		<TwoPointSlider
			min={LOWEST_STEP}
			max={HIGHEST_STEP}
			stepSize={15}
			bind:range
			accentColor={COLORS.FILTER.GAME_LENGTH}
			onEnd={save}
		/>

		<div style="display: flex; flex-direction: row;">
			<div style="flex-grow: 1;">
				<Title align="end" color={COLORS.ON_SURFACE}>{formatMinutes(range[0])}</Title>
			</div>
			<Title color={COLORS.ON_SURFACE}>-</Title>
			<div style="flex-grow: 1;">
				<Title align="start" color={COLORS.ON_SURFACE}>{formatMinutes(range[1])}</Title>
			</div>
		</div>
	</div>
</div>

<style>
</style>
