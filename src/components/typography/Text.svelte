<script lang="ts">
	import { COLORS } from '../../theme/colors'

	export let color: string = COLORS.TEXT_COLOR
</script>

<p class="text" style="color: {color}"><slot /></p>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 200;
		font-size: small;
		margin: 0.5em;
		text-align: center;
	}
</style>
