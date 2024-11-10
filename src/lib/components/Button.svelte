<script lang="ts">
	import { COLORS } from '$lib/theme/colors'
	import ButtonText from '$lib/components/typography/ButtonText.svelte'

	interface Props {
		icon: string
		color?: string
		children?: import('svelte').Snippet
		onclick?: () => void
	}

	let { icon, color = COLORS.TEXT_COLOR, children, onclick }: Props = $props()
</script>

<button class="button" {onclick} style="--color: {color}">
	<ButtonText>{@render children?.()}</ButtonText>
	<i class={icon} style="color: white;"></i>
</button>

<style>
	.button {
		background-color: var(--color);
		border-radius: 12px;
		padding: 12px;
		flex-grow: 1;
		border: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
