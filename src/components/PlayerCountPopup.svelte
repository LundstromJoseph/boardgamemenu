<script lang="ts">
	import { HIGHEST_PLAYER_COUNT } from '../fn/playerCount'
	import { playerCountStore } from '../store/filters'
	import FilterPopup from './FilterPopup.svelte'
	import PlayerCountButton from './PlayerCountButton.svelte'
	import Title from './typography/Title.svelte'

	const array = Array.from(Array(HIGHEST_PLAYER_COUNT + 1).keys())

	const update = (count: number) => {
		playerCountStore.set(count)
	}
</script>

<FilterPopup>
	<Title slot="title">Number of players</Title>
	<div slot="options" class="options">
		{#each array as index}
			<PlayerCountButton {index} {update} />
		{/each}
	</div>
</FilterPopup>

<style>
	.options {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		row-gap: 1em;
		column-gap: 0.2em;
		align-items: center;
		width: 100%;
	}
</style>
