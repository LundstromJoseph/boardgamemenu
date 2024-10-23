<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '../../../components/Button.svelte'
	import DefaultContainer from '../../../components/DefaultContainer.svelte'
	import Row from '../../../components/Row.svelte'
	import Header from '../../../components/typography/Header.svelte'
	import Text from '../../../components/typography/Text.svelte'
	import { clearUserId } from '../../../store/userId'

	interface Props {
		userId: string;
	}

	let { userId }: Props = $props();

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
		<Button icon="fa-solid fa-right-from-bracket" on:click={goHome}>Go to start</Button>
	</Row>
</DefaultContainer>
