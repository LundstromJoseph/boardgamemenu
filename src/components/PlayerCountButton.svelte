<script lang="ts">
	import { formatPlayerCount, playerCount } from '../store/playerCount'
	import { COLORS } from '../theme/colors'
	import RoundButton from './RoundButton.svelte'
	import IconText from './typography/IconText.svelte'

	export let index: number
	export let update: (i: number) => void
</script>

<RoundButton
	color={COLORS.FILTER.PLAYER_COUNT}
	selected={$playerCount === index}
	on:click={() => update(index)}
	label={`Set player count to ${index}`}
>
	<IconText>{formatPlayerCount(index)}</IconText>
</RoundButton>
