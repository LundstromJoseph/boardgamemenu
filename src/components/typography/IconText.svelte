<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<p class="text">{@render children?.()}</p>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: bold;
		font-size: 1rem;
		margin: 0;
		text-align: center;
		color: #222;
		text-transform: uppercase;
	}
</style>
