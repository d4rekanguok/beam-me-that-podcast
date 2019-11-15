<script>
	import Podcast from './Podcast.svelte'
	import Status from './Status.svelte'
	import { search_query, results } from '../store'
</script>

<style>
	main {
		box-sizing: border-box;
		width: 100%;
		padding: 1rem;
	}

	hr {
		border: none;
		border-bottom: 1px solid rgba(0,0,0,.1);
		margin: 1rem 0;
	}

	label, input {
		display: block;
		margin-bottom: 1rem;
	}

	label {
		font-weight: bold;
	}

	input {
		box-sizing: border-box;
		font-size: 1.5rem;
		padding: 0.5em;
		width: 100%;
		
		border-radius: 4px;
		border: 2px solid rgba(0,0,0,.2);
	}

	input:focus {
		border: 2px solid tomato;
	}
</style>

<main>
	<div>
		<label for="rss-input">
			Search for a podcast & listen to it on Google Podcast's Web player.
		</label>
		<input
			id="rss-input"
			bind:value={$search_query} 
			type="text"
			placeholder="i.e. Shoptalk Show"
		>
	</div>
	<hr />
	<Status />
	<hr />
	<ul class="results">
		{#each $results as result, i (result.feedUrl)}
			<li>
				<Podcast result={result} />
			</li>
		{/each}
	</ul>
</main>