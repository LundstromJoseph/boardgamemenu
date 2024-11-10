<script lang="ts">
	import { clickOutside } from '$lib/directive/clickOutside'
	import { fade, scale } from 'svelte/transition'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	let showMenu = $state(false)
	let menuButton: HTMLElement | undefined = $state()

	const toggleMenu = () => {
		showMenu = !showMenu
	}

	const closeMenu = () => {
		showMenu = false
	}
</script>

<div class="relative">
	<button class="text-white" aria-label="more-menu" bind:this={menuButton} onclick={toggleMenu}>
		<i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
	</button>

	{#if showMenu}
		<div
			class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-white ring-opacity-40 z-50"
			use:clickOutside
			onoutsideClicked={closeMenu}
			transition:fade={{ duration: 150 }}>
			<div class="p-2 flex flex-col gap-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
				{@render children?.()}
			</div>
		</div>
	{/if}
</div>
