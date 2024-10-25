<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/components/Button.svelte'
	import DefaultContainer from '$lib/components/DefaultContainer.svelte'
	import Row from '$lib/components/Row.svelte'
	import Header from '$lib/components/typography/Header.svelte'
	import Text from '$lib/components/typography/Text.svelte'
	import { clearUserId } from '$lib/store/userId'

	interface Props {
		userId: string
	}

	let { userId }: Props = $props()

	function goHome() {
		clearUserId()
		goto('/')
	}
</script>

<DefaultContainer>
	<Header>Could not load collection</Header>
	{#if userId}
		<Text>Currently using collection for user {userId}</Text>
	{/if}

	<Row>
		<Button icon="fa-solid fa-rotate">Try again</Button>
		<Button icon="fa-solid fa-right-from-bracket" onclick={goHome}>Go to start</Button>
	</Row>
</DefaultContainer>
