<script>
	import Podcast from './Podcast.svelte'
	import Status from './Status.svelte'
	import { search_query, results } from '../store'
</script>

<style>
	main {
		width: 100vw;
		padding-top: 1rem;
		font-size: 1.5rem;
	}

	label, input {
		display: block;
		margin-bottom: 1rem;
	}

	label {
		font-weight: bold;
	}

	input {
		font-size: 1.5rem;
		padding: 0.25rem;
		width: 100%;
	}
</style>

<main>
	<!-- <form on:submit|preventDefault={handleSubmit}> -->
	<form>
		<label for="rss-input">Search for a podcast</label>
		<input
			id="rss-input"
			bind:value={$search_query} 
			type="text"
			placeholder="i.e. Shoptalk Show"
		>
		<button type="submit">Search</button>
	</form>
	<hr />
	<Status />
	<ul class="results">
		{#each $results as result, i (result.feedUrl)}
			<li>
				<Podcast result={result} />
			</li>
		{/each}
	</ul>
</main>