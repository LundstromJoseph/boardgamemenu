<script lang="ts">
	import Title from '../../../components/typography/Title.svelte'
	import type { Boardgame } from '../../../types/boardgames'
	import BoardgameImage from './BoardgameImage.svelte'

	export let item: Boardgame

	let width: number = 0
	let show = false
</script>

<div class="boardgame" class:show>
	<div>
		<BoardgameImage bind:width bind:show {item} />
	</div>
	{#if show}
		<div class="title-container" style="width: {width}px">
			<Title align={'center'}>{item.name}</Title>
		</div>
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.boardgame {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		opacity: 0;
	}

	.boardgame.show {
		animation-duration: 1s;
		animation-name: fadeIn;
		opacity: 1;
	}

	.title-container {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.title-container {
		text-align: center;
	}
</style>
