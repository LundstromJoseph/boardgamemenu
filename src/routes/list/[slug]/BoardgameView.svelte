<script lang="ts">
	import Title from '../../../components/typography/Title.svelte'
	import type { Boardgame } from '../../../types/boardgames'
	import BoardgameImage from './BoardgameImage.svelte'

	export let item: Boardgame

	let width: number = 0
	let show = false
</script>

<div class="boardgame">
	<div class:show>
		<BoardgameImage bind:width bind:show {item} />
	</div>
	<div class="title-container" style="width: {width}px">
		<Title align={'center'}>{item.name}</Title>
	</div>
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
	}

	.show {
		animation-duration: 1s;
		animation-name: fadeIn;
		opacity: 1;
	}

	.title-container {
		text-align: center;
		border-radius: 20px;
		z-index: -1;
	}
</style>
