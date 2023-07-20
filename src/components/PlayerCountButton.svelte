<script lang="ts">
	import { formatPlayerCount } from '../fn/playerCount'
	import { playerCountStore } from '../store/filters'
	import { COLORS } from '../theme/colors'
	import RoundButton from './RoundButton.svelte'
	import IconText from './typography/IconText.svelte'

	export let index: number
	export let update: (i: number) => void
</script>

<RoundButton
	color={COLORS.FILTER.PLAYER_COUNT}
	selected={$playerCountStore === index}
	on:click={() => update(index)}
>
	<IconText>{formatPlayerCount(index)}</IconText>
</RoundButton>
