<script lang="ts">
	import { COLORS } from '../theme/colors'
	import ButtonText from './typography/ButtonText.svelte'

	export let icon: string
	export let color: string = COLORS.TEXT_COLOR
</script>

<button class="button" on:click style="--color: {color}">
	<ButtonText><slot /></ButtonText>
	<i class={icon} style="color: white;" />
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
