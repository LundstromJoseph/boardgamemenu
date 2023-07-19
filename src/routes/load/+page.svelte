<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { boardgameStore } from '../../store/boardgames'
	import type { Boardgame } from '../../types/boardgames'

	export let data

	if (browser) {
		const saveData = (data: Boardgame[]) => {
			if (data && data.length) {
				boardgameStore.set(data)
				goto('/list')
			}
		}

		saveData(data?.boardgames)
	}
</script>

<div>Loading your collection...</div>
