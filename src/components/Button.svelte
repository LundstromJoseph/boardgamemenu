<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { COLORS } from '../theme/colors'
	import ButtonText from './typography/ButtonText.svelte'

	interface Props {
		icon: string;
		color?: string;
		children?: import('svelte').Snippet;
	}

	let { icon, color = COLORS.TEXT_COLOR, children }: Props = $props();
</script>

<button class="button" onclick={bubble('click')} style="--color: {color}">
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
		justify-content: center;
		align-items: center;
	}
</style>
