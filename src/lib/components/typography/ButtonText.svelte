<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<h3 class="text">{@render children?.()}</h3>

<style>
	.text {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 200;
		font-size: smaller;
		margin: 0.5em;
		text-align: center;
		color: #fff;
		text-transform: uppercase;
	}
</style>
