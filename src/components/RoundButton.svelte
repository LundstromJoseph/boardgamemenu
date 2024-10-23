<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { COLORS } from '../theme/colors'

	interface Props {
		el?: HTMLElement | undefined;
		selected?: boolean;
		color?: string;
		type?: HTMLButtonElement['type'];
		label: string;
		children?: import('svelte').Snippet;
	}

	let {
		el = $bindable(undefined),
		selected = false,
		color = COLORS.TEXT_COLOR,
		type = 'button',
		label,
		children
	}: Props = $props();

	let classes = $derived(selected ? 'button selected-button' : 'button')
</script>

<button
	aria-label={label}
	{type}
	class={classes}
	style="background-color: {color};"
	bind:this={el}
	onclick={bubble('click')}
>
	{@render children?.()}
</button>

<style>
	.button {
		width: 100%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		border-width: 1;
		border-color: #000;
		border-style: solid;
	}

	.selected-button {
		border-color: white;
	}
</style>
