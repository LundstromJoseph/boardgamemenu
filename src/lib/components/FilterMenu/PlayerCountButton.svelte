<script lang="ts">
	import { formatPlayerCount, playerCount } from '../../store/playerCount'
	import { COLORS } from '../../theme/colors'
	import RoundButton from '$lib/components/RoundButton.svelte'
	import IconText from '$lib/components/typography/IconText.svelte'

	interface Props {
		index: number
		update: (i: number) => void
	}

	let { index, update }: Props = $props()
</script>

<RoundButton
	color={COLORS.FILTER.PLAYER_COUNT}
	selected={$playerCount === index}
	onclick={() => update(index)}
	label={`Set player count to ${index}`}>
	<IconText>{formatPlayerCount(index)}</IconText>
</RoundButton>
