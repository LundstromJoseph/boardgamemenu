<script lang="ts">
	import Error from './+error.svelte'
	import { _loadBoardgames } from './+page'
	import BoardgameList from './BoardgameList.svelte'
	import Loading from './Loading.svelte'

	export let data

	$: boardgames = _loadBoardgames(data.userId)
</script>

{#await boardgames}
	<Loading userId={data.userId} />
{:then loadedData}
	<BoardgameList userId={loadedData.userId} items={loadedData.boardgames} />
{:catch error}
	<Error userId={data.userId} />
{/await}
