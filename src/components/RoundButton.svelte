<script lang="ts">
	import { COLORS } from '../theme/colors'

	export let el: HTMLElement | undefined = undefined
	export let selected = false
	export let color: string = COLORS.TEXT_COLOR
	export let type: HTMLButtonElement['type'] = 'button'

	$: classes = selected ? 'button selected-button' : 'button'
</script>

<button {type} class={classes} style="background-color: {color};" bind:this={el} on:click>
	<slot />
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
