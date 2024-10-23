<script lang="ts">
	import {
		complexity,
		complexityDescription,
		HIGHEST_COMPLEXITY,
		LOWEST_COMPLEXITY
	} from '../../store/complexity'
	import { COLORS } from '../../theme/colors'
	import type { Range } from '../../types/boardgames'
	import TwoPointSlider from '../TwoPointSlider.svelte'
	import Title from '../typography/Title.svelte'

	let range: Range = $state([$complexity[0], $complexity[1]])

	const description = (value: number) => {
		return `${complexityDescription(value)} (${value})`
	}

	function save(range: Range) {
		complexity.set(range)
	}
</script>

<div>
	<Title>Complexity</Title>
	<div>
		<TwoPointSlider
			min={LOWEST_COMPLEXITY}
			max={HIGHEST_COMPLEXITY}
			stepSize={0.1}
			onEnd={save}
			bind:range
			accentColor={COLORS.FILTER.COMPLEXITY}
		/>
		<div style="display: flex; flex-direction: row;">
			<div style="flex-grow: 1;">
				<Title align="end">{description(range[0])}</Title>
			</div>
			<div>
				<Title>-</Title>
			</div>
			<div style="flex-grow: 1;">
				<Title align="start">{description(range[1])}</Title>
			</div>
		</div>
	</div>
</div>

<style>
</style>
