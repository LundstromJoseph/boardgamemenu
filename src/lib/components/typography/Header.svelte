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
		font-weight: 500;
		font-size: medium;
		margin: 0.5em;
		text-align: center;
		color: #ddd;
	}
</style>
