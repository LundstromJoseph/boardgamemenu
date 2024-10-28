<script lang="ts">
	import { HIGHEST_PLAYER_COUNT } from '../../state/playerCount.svelte'
	import { COLORS } from '../../theme/colors'
	import RoundButton from '$lib/components/RoundButton.svelte'
	import IconText from '$lib/components/typography/IconText.svelte'
	import type { BoardgameState } from '$lib/state/boardgames.svelte'

	interface Props {
		index: number
		update: (i: number) => void
		playerState: BoardgameState['filters']['playerCount']
	}
	let { index, update, playerState }: Props = $props()

	const formattedPlayerCount = (playerCount: number) => {
		if (playerCount === HIGHEST_PLAYER_COUNT) {
			return HIGHEST_PLAYER_COUNT + '+'
		} else {
			return playerCount.toLocaleString(undefined, { maximumFractionDigits: 0 })
		}
	}
</script>

<RoundButton
	color={COLORS.FILTER.PLAYER_COUNT}
	selected={playerState.get() === index}
	onclick={() => update(index)}
	label={`Set player count to ${index}`}>
	<IconText>{formattedPlayerCount(index)}</IconText>
</RoundButton>
