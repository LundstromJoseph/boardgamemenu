<script lang="ts">
	import Error from './+error.svelte'
	import BoardgameList from './BoardgameList.svelte'
	import Loading from './Loading.svelte'

	let { data } = $props()
</script>

{#await data.boardgameState}
	<Loading userId={data.userId} loadingState={data.loadingState} />
{:then boardgameState}
	<BoardgameList {boardgameState} />
{:catch}
	<Error userId={data.userId} />
{/await}
