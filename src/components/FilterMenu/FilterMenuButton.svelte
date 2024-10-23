<script>
	import { preventDefault, stopPropagation } from 'svelte/legacy';

	let { onClick = () => {} } = $props();
</script>

<button class="fab" aria-label="filters-menu" onmousedown={stopPropagation(preventDefault(onClick))}>
	<i class="fa-solid fa-bars fa-lg"></i>
</button>

<style>
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
</style>
