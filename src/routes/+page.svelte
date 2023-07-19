<script lang="ts">
	import { _handleSubmit } from './+page';
</script>

<div class="result-container">
	<form on:submit={_handleSubmit}>
		<label for="bgg-username">Enter bgg username</label>
		<input id="bgg-username" />
		<button type="submit">go</button>
	</form>
</div>

<style>
	* {
		box-sizing: border-box;
	}
</style>
