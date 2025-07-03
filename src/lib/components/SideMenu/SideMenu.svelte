<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/components/Button.svelte'
	import Complexity from '$lib/components/FilterMenu/Complexity.svelte'
	import GameLength from '$lib/components/FilterMenu/GameLength.svelte'
	import PlayerCount from '$lib/components/FilterMenu/PlayerCount.svelte'
	import MoreMenu from '$lib/components/SideMenu/MoreMenu.svelte'
	import Title from '$lib/components/typography/Title.svelte'
	import { clickOutside } from '$lib/directive/clickOutside'
	import type { BoardgameState } from '$lib/state/boardgames.svelte'
	import { COLORS } from '$lib/theme/colors'
	import { slide } from 'svelte/transition'

	interface Props {
		boardgameState: BoardgameState
	}

	let { boardgameState }: Props = $props()

	let show = $state(false)

	let boardgameCount = $derived(boardgameState.getBoardgames().length)

	let filteredCount = $derived(boardgameState.getBoardgames(true).length)

	let text = $derived(boardgameCount ? `${filteredCount}/${boardgameCount} games visible` : '')

	function onClick(event: Event) {
		if (event.cancelable) {
			event.preventDefault()
		}
		event.stopImmediatePropagation()
		event.stopPropagation()
		show = !show
	}

	function onReload() {
		const userId = $state(boardgameState.getUserId())
		boardgameState.clear()
		goto(`/list/${userId}`, { replaceState: true, invalidateAll: true })
	}

	function onReset() {
		boardgameState.clear()
		goto(`/`, { replaceState: true, invalidateAll: true })
	}
</script>

<aside class="fixed right-0 h-screen flex z-50">
	{#if show}
		<section
			in:slide={{ axis: 'x' }}
			out:slide={{ axis: 'x' }}
			onoutsideClicked={() => (show = false)}
			use:clickOutside
			class="p-4 w-open-side-menu bg-black bg-opacity-90 flex flex-col align-center gap-4">
			<section class="w-side-menu-content">
				<header class="flex justify-between">
					<h1 class="text-white uppercase">{boardgameState.getUserId()}</h1>
					<MoreMenu>
						<button onclick={onReload} class="text-white justify-between flex items-center"
							>Reload <i class="fa-solid w-8 fa-rotate text-white"></i></button>
						<hr />
						<button onclick={onReset} class="text-white justify-between flex items-center"
							>Reset <i class="fa-solid w-8 fa-x text-white"></i></button>
					</MoreMenu>
				</header>
				<h2 class="text-white uppercase inline">{text}</h2>
			</section>
			<section class="w-side-menu-content flex flex-col self-center justify-center gap-4">
				<h3 class="text-white">Filters</h3>
				<PlayerCount playerState={boardgameState.filters.playerCount} />
				<Complexity complexityState={boardgameState.filters.complexity} />
				<GameLength gameLengthState={boardgameState.filters.gameLength} />
			</section>

			<section class="flex-grow"></section>
			<section>
				<Title style="font-size: xx-small;">
					Data supplied by <a style="color: white;" href="https://boardgamegeek.com" target="_blank">
						boardgamegeek.com</a>
				</Title>
			</section>
		</section>
	{/if}
	<button
		class="fixed bg-yellow-500 w-20 aspect-square rounded-full bottom-5 right-5 text-gray-800 transition-transform duration-300"
		class:rotate-180={show}
		aria-label="open-side-menu"
		onmousedown={onClick}>
		<i class="fa-solid fa-arrow-left fa-lg"></i>
	</button>
</aside>
