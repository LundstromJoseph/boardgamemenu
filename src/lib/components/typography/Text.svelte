<script lang="ts">
	import { COLORS } from '../../theme/colors'

	interface Props {
		color?: string;
		children?: import('svelte').Snippet;
	}

	let { color = COLORS.TEXT_COLOR, children }: Props = $props();
</script>

<p class="text" style="color: {color}">{@render children?.()}</p>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 200;
		font-size: small;
		margin: 0.5em;
		text-align: center;
	}
</style>
