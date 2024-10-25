<script lang="ts">
	import { formatPlayerCount } from '../../store/playerCount.svelte'
	import { COLORS } from '../../theme/colors'
	import RoundButton from '$lib/components/RoundButton.svelte'
	import IconText from '$lib/components/typography/IconText.svelte'
	import { boardgameStore } from '$lib/store/boardgames.svelte'

	const playerCount = boardgameStore.filters.playerCount
	interface Props {
		index: number
		update: (i: number) => void
	}

	let { index, update }: Props = $props()
</script>

<RoundButton
	color={COLORS.FILTER.PLAYER_COUNT}
	selected={playerCount.get() === index}
	onclick={() => update(index)}
	label={`Set player count to ${index}`}>
	<IconText>{formatPlayerCount(index)}</IconText>
</RoundButton>
