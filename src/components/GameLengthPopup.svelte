<script lang="ts">
	import {
		formatMinutes,
		gameLengthRangeToNormalize,
		normalizedRangeToGameLength
	} from '../fn/gameLength'
	import { gameLengthStore } from '../store/filters'
	import { COLORS } from '../theme/colors'
	import FilterPopup from './FilterPopup.svelte'
	import TwoPointSlider from './TwoPointSlider.svelte'
	import Title from './typography/Title.svelte'

	let range = gameLengthRangeToNormalize($gameLengthStore)

	$: gameLength = normalizedRangeToGameLength(range)

	function save() {
		gameLengthStore.set(gameLength)
	}
</script>

<FilterPopup>
	<Title slot="title" color={COLORS.ON_SURFACE}>Gamelength</Title>
	<svelte:fragment slot="options">
		<TwoPointSlider bind:range accentColor={COLORS.FILTER.GAME_LENGTH} onEnd={save} />

		<div style="flex-grow: 1;">
			<Title align="end" color={COLORS.ON_SURFACE}>{formatMinutes(gameLength[0])}</Title>
		</div>
		<Title color={COLORS.ON_SURFACE}>-</Title>
		<div style="flex-grow: 1;">
			<Title align="start" color={COLORS.ON_SURFACE}>{formatMinutes(gameLength[1])}</Title>
		</div>
	</svelte:fragment>
</FilterPopup>
