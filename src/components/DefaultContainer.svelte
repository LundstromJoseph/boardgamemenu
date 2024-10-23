<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="container">
	{@render children?.()}
</div>

<style>
	.container {
		max-width: 500px;
		margin: 0 auto;
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 1;
	}
</style>
