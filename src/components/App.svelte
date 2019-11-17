<script>
	import Podcast from './Podcast.svelte'
	import Status from './Status.svelte'
	import Saved from './Saved.svelte'
	import { search_query, results, saved } from '../store'

	function isSaved(feedId) {
		return $saved.some(podcast => podcast.feedId === feedId)
	}
</script>

<style>
	main {
		box-sizing: border-box;
		width: 100%;
	}

	.top {
		position: sticky;
		background-color: var(--bg);
		top: 0;
		z-index: 100;
		border-bottom: 1px solid rgba(0,0,0,.1);
	}

	.input {
		padding: 1rem;
	}

	.bottom {
		padding: 1rem;
	}

	label {
		display: block;
		margin-bottom: 1rem;
		font-weight: bold;
	}

	input {
		display: block;
		margin-bottom: 1rem;

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
	<div class="top">
		<Saved />
		<div class="input">
			<label for="rss-input">
				Search for a podcast or paste an URL & listen to it on Google Podcast's web player.
			</label>
			<input
				id="rss-input"
				bind:value={$search_query} 
				type="text"
				placeholder="i.e. 'Reply All' or 'https://feeds.megaphone.fm/replyall'"
			>
			<Status />
		</div>
	</div>
	<div class="bottom">
		<ul class="results">
			{#each $results as result, i (result.feedId)}
				<li>
					<Podcast result={result} is_saved={isSaved(result.feedId)} />
				</li>
			{/each}
		</ul>
	</div>
</main>