<script lang="ts">
	import { scale } from 'svelte/transition'
	import { BOTTOM_BAR_HEIGHT } from '../../theme/sizes'
	import GameLength from './GameLength.svelte'
	import Complexity from './Complexity.svelte'
	import PlayerCount from './PlayerCount.svelte'
	import { COLORS } from '../../theme/colors'
	import { clickOutside } from '../../directive/clickOutside'
	import Title from '../typography/Title.svelte'

	export let onOutsideClicked: () => void
</script>

<div
	class="container"
	style="bottom: {BOTTOM_BAR_HEIGHT}px; background-color: {COLORS.SURFACE}"
	in:scale
	out:scale
	use:clickOutside
	on:outsideClicked={onOutsideClicked}>
	<div class="content">
		<PlayerCount />
		<Complexity />
		<GameLength />
		<div>
			<Title style="font-size: x-small;">
				Data supplied by <a style="color: white;" href="https://boardgamegeek.com" target="_blank"> boardgamegeek.com</a>
			</Title>
		</div>
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
