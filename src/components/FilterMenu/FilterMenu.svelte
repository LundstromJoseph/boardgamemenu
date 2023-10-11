<script lang="ts">
	import { scale } from 'svelte/transition'
	import { BOTTOM_BAR_HEIGHT } from '../../theme/sizes'
	import GameLength from './GameLength.svelte'
	import Complexity from './Complexity.svelte'
	import PlayerCount from './PlayerCount.svelte'
</script>

<div class="container" style="--bottom-bar-height: {BOTTOM_BAR_HEIGHT}px;" in:scale out:scale>
	<div class="content">
		<PlayerCount />
		<Complexity />
		<GameLength />
	</div>
</div>

<style>
	.container {
		position: fixed;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		width: 80%;
		max-width: 500px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 95;
		transform-origin: 50% 100%;
		bottom: 30px;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		padding-bottom: 32px;
	}
	.content {
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
