<script>
	import { boardgameStore } from '../../../store/boardgames'
	import Title from '../../../components/typography/Title.svelte'
	import { filteredBoardgames } from '../../../store/filteredBoardgames'

	export let onClick = () => {}

	$: boardgameCount = $boardgameStore.boardgames.length

	$: filteredCount = $filteredBoardgames.length

	$: text = boardgameCount ? `${filteredCount}/${boardgameCount} games visible` : ''
</script>

<div class="bottom-bar">
	<div class="content">
		<Title>{$boardgameStore.userId}</Title>
		<Title>{text}</Title>
	</div>
</div>

<button class="fab" on:click={onClick}>
	<i class="fa-solid fa-bars fa-lg" />
</button>

<style>
	.bottom-bar {
		position: fixed;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		left: 0;
		height: 30px;
		width: 100%;
		z-index: 90;
		transform-origin: 50% 0%;
	}

	.fab {
		z-index: 100;
		position: fixed;
		left: 50%;
		bottom: 10px;
		transform: translateX(-50%);
		border-radius: 50%;
		border: none;
		width: 70px;
		height: 70px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fcba03;
	}

	.fab i {
		color: black;
	}

	.fab:active {
		border: none;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		z-index: 97;
		padding-left: 6px;
		padding-right: 6px;
	}
</style>
