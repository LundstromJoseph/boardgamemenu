<script lang="ts">
	import { playerCountStore } from '../store/filters'
	import { COLORS } from '../theme/colors'
	import FilterPopup from './FilterPopup.svelte'
	import RoundButton from './RoundButton.svelte'
	import IconText from './typography/IconText.svelte'
	import Title from './typography/Title.svelte'

	$: playerCount = $playerCountStore

	const update = (count: number) => {
		playerCountStore.set(count)
	}
</script>

<FilterPopup>
	<Title slot="title">Number of players</Title>
	<svelte:fragment slot="options">
		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 1}
				on:click={() => update(1)}
			>
				<IconText>1</IconText>
			</RoundButton>
		</div>
		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 2}
				on:click={() => update(2)}
			>
				<IconText>2</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 3}
				on:click={() => update(3)}
			>
				<IconText>3</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 4}
				on:click={() => update(4)}
			>
				<IconText>4</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 5}
				on:click={() => update(5)}
			>
				<IconText>5</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 6}
				on:click={() => update(6)}
			>
				<IconText>6</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				selected={playerCount === 7}
				on:click={() => update(7)}
			>
				<IconText>7+</IconText>
			</RoundButton>
		</div>

		<div class="wrapper">
			<RoundButton
				color={COLORS.FILTER.PLAYER_COUNT}
				on:click={() => update(0)}
				selected={playerCount === 0}
			>
				<IconText>Any</IconText>
			</RoundButton>
		</div>
	</svelte:fragment>
</FilterPopup>

<style>
	.wrapper {
		display: flex;
		flex-grow: 1;
		justify-content: center;
	}
</style>
