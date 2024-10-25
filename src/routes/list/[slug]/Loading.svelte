<script lang="ts">
	import { fade } from 'svelte/transition'
	import Spinner from '$lib/components/Spinner.svelte'
	import BigHeader from '$lib/components/typography/BigHeader.svelte'
	import Header from '$lib/components/typography/Header.svelte'

	interface Props {
		userId: string
	}

	let { userId }: Props = $props()
</script>

<div class="container" in:fade={{ delay: 500, duration: 500 }}>
	<div>
		<BigHeader>Loading</BigHeader>
	</div>
	<div>
		<Header>The {userId} collection is loading...</Header>
	</div>
	<div>
		<Spinner />
	</div>
</div>

<style>
	.container {
		width: 100%;
		margin: auto;
		max-width: 600px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 24px;
		flex-direction: column;
	}
</style>
