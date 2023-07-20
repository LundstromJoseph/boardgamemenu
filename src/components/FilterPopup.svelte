<script lang="ts">
	import { slide } from 'svelte/transition'
	import { COLORS } from '../theme/colors'
	import { BOTTOM_BAR_HEIGHT } from '../theme/sizes'

	let height: number
	let width: number
	export let color: string = COLORS.SURFACE
</script>

<div
	class="container"
	style="--bottom-bar-height: {BOTTOM_BAR_HEIGHT}px; background-color: {color}"
	bind:clientHeight={height}
	bind:clientWidth={width}
	in:slide
	out:slide
>
	<div class="content">
		<div>
			<slot name="title" />
		</div>
		<div>
			<slot name="options" />
		</div>
	</div>
</div>

<style>
	.container {
		position: fixed;
		display: flex;
		flex-direction: column;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		gap: 12px;
		width: 100%;
		left: 0;
		z-index: -1;
		transform-origin: 50% 100%;
		bottom: var(--bottom-bar-height);
	}
	.content {
		padding: 24px;
	}
</style>
