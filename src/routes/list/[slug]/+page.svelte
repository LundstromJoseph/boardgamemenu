<script lang="ts">
	import Error from './+error.svelte'
	import { _loadBoardgames } from './+page'
	import BoardgameList from './BoardgameList.svelte'
	import Loading from './Loading.svelte'

	let { data } = $props();

	let boardgames = $derived(_loadBoardgames(data.userId))
</script>

{#await boardgames}
	<Loading userId={data.userId} />
{:then}
	<BoardgameList />
{:catch}
	<Error userId={data.userId} />
{/await}
