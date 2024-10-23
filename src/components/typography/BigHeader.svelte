<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<h1 class="text">{@render children?.()}</h1>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 500;
		font-size: xx-large;
		margin: 0.5em;
		text-align: center;
		color: #ddd;
	}
</style>
