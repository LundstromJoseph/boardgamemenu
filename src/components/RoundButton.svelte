<script lang="ts">
	import { fly } from 'svelte/transition'
	import { COLORS } from '../theme/colors'

	export let el: HTMLElement | undefined = undefined
	export let selected = false
	export let color: string = COLORS.TEXT_COLOR
	const offset = 20
</script>

{#if selected}
	<button class="button selected-button" style="background-color: {color};" bind:this={el} on:click>
		<slot />
	</button>
{:else}
	<button class="button" style="background-color: {color};" bind:this={el} on:click>
		<slot />
	</button>
{/if}

<style>
	.button {
		border-radius: 99px;
		width: 74px;
		height: 74px;
		border-width: 1;
		border-color: #000;
		border-style: solid;
	}

	.selected-button {
		border-color: white;
	}
</style>
