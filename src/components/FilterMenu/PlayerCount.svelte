<script lang="ts">
	import { HIGHEST_PLAYER_COUNT, playerCount } from '../../store/playerCount'
	import PlayerCountButton from './PlayerCountButton.svelte'
	import Title from '../typography/Title.svelte'

	const array = Array.from(Array(HIGHEST_PLAYER_COUNT).keys())

	const update = (count: number) => {
		if ($playerCount == count) {
			playerCount.set(0)
		} else {
			playerCount.set(count)
		}
	}
</script>

<div>
	<Title>Number of players</Title>
	<div class="options">
		{#each array as index}
			<div style="min-width: 55px;">
				<PlayerCountButton index={index + 1} {update} />
			</div>
		{/each}
	</div>
</div>

<style>
	.options {
		display: flex;
		flex-wrap: nowrap;
		column-gap: 0.2em;
		align-items: center;
		width: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		padding-bottom: 12px;
	}

	::-webkit-scrollbar {
		width: 12px;
		border-radius: 12px;
	}

	::-webkit-scrollbar-track {
		background: #444;
		border-radius: 12px;
		margin: 30px 0;
	}

	::-webkit-scrollbar-thumb {
		background: #fcba03;
		border-radius: 12px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #fcba03;
	}
</style>
