<script lang="ts">
	import { HIGHEST_STEP, LOWEST_STEP } from '$lib/state/gameLength.svelte'
	import { COLORS } from '../../theme/colors'
	import type { Range } from '$lib/types'
	import TwoPointSlider from '../TwoPointSlider.svelte'
	import Title from '../typography/Title.svelte'
	import type { BoardgameState } from '$lib/state/boardgames.svelte'

	interface Props {
		gameLengthState: BoardgameState['filters']['gameLength']
	}

	const formatMinutes = (minutes: Range) => {
		return minutes.map((minute) => {
			const hours = Math.floor(minute / 60)
			const minutes = minute - hours * 60
			let formattedString = ''
			formattedString = formattedString + `${hours}:${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
			if (minute === HIGHEST_STEP) {
				formattedString += '+'
			}

			return formattedString
		})
	}

	let { gameLengthState }: Props = $props()

	let range = $state(gameLengthState.get())

	const minutes = $derived(formatMinutes(range))

	function save(range: Range) {
		gameLengthState.set(range)
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
				<Title align="end" color={COLORS.ON_SURFACE_TEXT}>{minutes[0]}</Title>
			</div>
			<Title color={COLORS.ON_SURFACE_TEXT}>-</Title>
			<div style="flex-grow: 1;">
				<Title align="start" color={COLORS.ON_SURFACE_TEXT}>{minutes[1]}</Title>
			</div>
		</div>
	</div>
</div>

<style>
</style>
