<script lang="ts">
	import {
		complexityRangeToNormalized,
		normalizedRangeToComplexity,
		weightToText
	} from '../fn/complexity'
	import { complexityStore } from '../store/filters'
	import { COLORS } from '../theme/colors'
	import FilterPopup from './FilterPopup.svelte'
	import TwoPointSlider from './TwoPointSlider.svelte'
	import Title from './typography/Title.svelte'

	let range = complexityRangeToNormalized($complexityStore)
	$: complexity = normalizedRangeToComplexity(range)

	function save() {
		complexityStore.set(complexity)
	}
</script>

<FilterPopup>
	<Title slot="title">Complexity</Title>
	<svelte:fragment slot="options">
		<TwoPointSlider bind:range onEnd={save} accentColor={COLORS.FILTER.COMPLEXITY} />
		<div style="flex-grow: 1;">
			<Title align="end">{`${weightToText(complexity[0])} (${complexity[0]})`}</Title>
		</div>
		<div>
			<Title>-</Title>
		</div>
		<div style="flex-grow: 1;">
			<Title align="start">{`${weightToText(complexity[1])} (${complexity[1]})`}</Title>
		</div>
	</svelte:fragment>
</FilterPopup>
