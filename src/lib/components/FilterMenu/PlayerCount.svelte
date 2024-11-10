<script lang="ts">
	import { HIGHEST_PLAYER_COUNT } from '../../state/playerCount.svelte'
	import Title from '../typography/Title.svelte'
	import type { BoardgameState } from '$lib/state/boardgames.svelte'
	import SinglePointSlider from '$lib/components/SinglePointSlider.svelte'
	import { COLORS } from '$lib/theme/colors'

	interface Props {
		playerState: BoardgameState['filters']['playerCount']
	}

	let { playerState }: Props = $props()

	const update = (count: number) => {
		playerState.set(count)
	}

	let value = $state(playerState.get())

	let text = $derived(value === 0 ? 'Any' : value === HIGHEST_PLAYER_COUNT ? `${HIGHEST_PLAYER_COUNT}+` : value)
</script>

<div>
	<div>
		<Title>Number of players</Title>
	</div>
	<div>
		<SinglePointSlider
			accentColor={COLORS.FILTER.PLAYER_COUNT}
			max={HIGHEST_PLAYER_COUNT}
			min={0}
			stepSize={1}
			bind:value
			onEnd={update} />
	</div>
	<div style="display: flex; flex-direction: row;">
		<div style="flex-grow: 1;">
			<Title align="center" color={COLORS.ON_SURFACE_TEXT}>{text}</Title>
		</div>
	</div>
</div>
