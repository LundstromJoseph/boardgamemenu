<script lang="ts">
	import type { Boardgame } from '$lib/types'
	import { observe } from '../../../lib/directive/observe'

	interface Props {
		item: Boardgame
		width?: number
		show?: boolean
	}

	let { item, width = $bindable(0), show = $bindable(false) }: Props = $props()

	let img: HTMLImageElement | undefined = $state()
	let visibleInViewport = $state(false)

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

	$effect.pre(() => {
		if (img) {
			loadImage(img, item, visibleInViewport)
		}
	})
</script>

<img src="/placeholder.png" use:observe onvisible={onVisible} class:show bind:this={img} class="img" alt={item.name} />

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
