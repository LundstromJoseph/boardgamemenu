<script lang="ts">
	import { COLORS } from '../../theme/colors'

	export let color: string = COLORS.TEXT_COLOR
	export let align: 'start' | 'center' | 'end' = 'start'
</script>

<p class="text" style="--color: {color}; --align: {align}"><slot /></p>

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
