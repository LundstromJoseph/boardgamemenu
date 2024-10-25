<script lang="ts">
	import { HIGHEST_STEP, LOWEST_STEP, formatMinutes } from '$lib/store/gameLength.svelte'
	import { COLORS } from '../../theme/colors'
	import type { Range } from '$lib/types'
	import TwoPointSlider from '../TwoPointSlider.svelte'
	import Title from '../typography/Title.svelte'
	import { boardgameStore } from '$lib/store/boardgames.svelte'

	const gameLength = boardgameStore.filters.gameLength

	let range: Range = $state(gameLength.get())

	function save(range: Range) {
		gameLength.set(range)
	}
</script>

<div>
	<div>
		<Title color={COLORS.ON_SURFACE_TEXT}>Gamelength</Title>
	</div>
	<div>
		<TwoPointSlider
			min={LOWEST_STEP}
			max={HIGHEST_STEP}
			stepSize={15}
			bind:range
			accentColor={COLORS.FILTER.GAME_LENGTH}
			onEnd={save} />

		<div style="display: flex; flex-direction: row;">
			<div style="flex-grow: 1;">
				<Title align="end" color={COLORS.ON_SURFACE_TEXT}>{formatMinutes(range[0])}</Title>
			</div>
			<Title color={COLORS.ON_SURFACE_TEXT}>-</Title>
			<div style="flex-grow: 1;">
				<Title align="start" color={COLORS.ON_SURFACE_TEXT}>{formatMinutes(range[1])}</Title>
			</div>
		</div>
	</div>
</div>

<style>
</style>
