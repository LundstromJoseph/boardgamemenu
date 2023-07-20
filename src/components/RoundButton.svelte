<script lang="ts">
	import { COLORS } from '../theme/colors'

	export let el: HTMLElement | undefined = undefined
	export let selected = false
	export let color: string = COLORS.TEXT_COLOR
	export let type: HTMLButtonElement['type'] = 'button'
</script>

{#if selected}
	<button
		{type}
		class="button selected-button"
		style="background-color: {color};"
		bind:this={el}
		on:click
	>
		<slot />
	</button>
{:else}
	<button {type} class="button" style="background-color: {color};" bind:this={el} on:click>
		<slot />
	</button>
{/if}

<style>
	.button {
		border-radius: 50%;
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
