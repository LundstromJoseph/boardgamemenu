<script lang="ts">
	import { COLORS } from '../../theme/colors'

	interface Props {
		color?: string;
		align?: 'start' | 'center' | 'end';
		style?: string;
		children?: import('svelte').Snippet;
	}

	let {
		color = COLORS.TEXT_COLOR,
		align = 'start',
		style = '',
		children
	}: Props = $props();
</script>

<p class="text" style="--color: {color}; --align: {align}; {style}">{@render children?.()}</p>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 500;
		font-size: small;
		margin: 0.5em;
		text-align: var(--align);
		color: var(--color);
		text-transform: uppercase;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
