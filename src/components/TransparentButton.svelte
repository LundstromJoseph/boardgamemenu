<script lang="ts">
</script>

<button type="button" class="button" on:click>
	<slot />
</button>

<style>
	.button {
		border-radius: 0;
		border-width: 0;
		background-color: transparent;
	}
</style>
