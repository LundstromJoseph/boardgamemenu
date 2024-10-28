<script lang="ts">
	import { HIGHEST_COMPLEXITY, LOWEST_COMPLEXITY } from '$lib/state/complexity.svelte'
	import { COLORS } from '$lib/theme/colors'
	import type { Range } from '$lib/types'
	import TwoPointSlider from '$lib/components/TwoPointSlider.svelte'
	import Title from '$lib/components/typography/Title.svelte'
	import type { BoardgameState } from '$lib/state/boardgames.svelte'

	interface Props {
		complexityState: BoardgameState['filters']['complexity']
	}

	const complexityDescription = (range: Range) => {
		return range.map((weight) => {
			if (weight < 2.5) {
				return `easy (${weight})`
			} else if (weight < 4) {
				return `moderate (${weight})`
			} else {
				return `hard (${weight})`
			}
		})
	}

	let { complexityState }: Props = $props()

	let range = $state(complexityState.get())

	let descriptions = $derived(complexityDescription(range))

	function save(range: Range) {
		complexityState.set(range)
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
			accentColor={COLORS.FILTER.COMPLEXITY} />
		<div style="display: flex; flex-direction: row;">
			<div style="flex-grow: 1;">
				<Title align="end">{descriptions[0]}</Title>
			</div>
			<div>
				<Title>-</Title>
			</div>
			<div style="flex-grow: 1;">
				<Title align="start">{descriptions[1]}</Title>
			</div>
		</div>
	</div>
</div>

<style>
</style>
