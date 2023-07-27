<script lang="ts">
	import { COLORS } from '../theme/colors'
	import Title from './typography/Title.svelte'

	export let el: HTMLElement | undefined = undefined
	export let color: string = COLORS.TEXT_COLOR
	export let icon: string
	export let text: string
	export let label: string
</script>

<button class="button" bind:this={el} on:click aria-label={label}>
	<div class="container">
		<i class="fa-solid {icon} fa-xl" style="color: {color};" />
		<Title {color}>{text}</Title>
	</div>
</button>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 0.3em;
		justify-content: center;
		align-items: center;
	}
	.button {
		width: 100%;
		border-width: 0;
		background-color: transparent;
		flex-grow: 1;
	}
</style>
