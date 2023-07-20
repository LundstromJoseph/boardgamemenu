<script lang="ts">
	import { observe } from '../../../directive/observe'
	import type { Boardgame } from '../../../types/boardgames'

	export let item: Boardgame
	export let width: number = 0
	export let show = false

	let img: HTMLImageElement
	let visibleInViewport = false

	const onVisible = () => {
		visibleInViewport = true
	}

	const loadImage = (img: HTMLImageElement, item: Boardgame, visible: boolean) => {
		show = false
		if (img && visible) {
			img.onload = () => {
				show = true
				width = img.width
			}
			img.src = item.image
		}
	}

	$: loadImage(img, item, visibleInViewport)
</script>

<img
	src="placeholder.png"
	use:observe
	on:visible={onVisible}
	class:show
	bind:this={img}
	class="img"
	alt={item.name}
/>

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

	.img {
		object-fit: cover;
		aspect-ratio: 1 / 1;
		max-height: 100%;
		max-width: 100%;
		border-radius: 20px;
	}
</style>
