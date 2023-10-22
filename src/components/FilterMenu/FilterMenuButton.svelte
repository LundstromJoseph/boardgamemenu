<script>
	export let onClick = () => {}
</script>

<button class="fab" aria-label="filters-menu" on:mousedown|preventDefault|stopPropagation={onClick}>
	<i class="fa-solid fa-bars fa-lg" />
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
