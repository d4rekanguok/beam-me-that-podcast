<script>
	let search_query = ''
	let data = []
	$: results = process(data)
	
	async function search(query) {
		try {
			const result = await fetch('.netlify/functions/search', {
				method: 'POST',
				body: JSON.stringify({ query }),
			})
			// const result = await fetch('/sample.json')
			const { results, message } = await result.json()
			if (message) throw new Error(message)
			data = results
		} catch(err) {
			console.log(err)
		}
	}

	function parse(rss) {
		try {
			const parts = rss.split('?')
			const feed_id = parts.filter(value => value).map(btoa).join('_')
			return `https://podcasts.google.com/?feed=${feed_id}`
		} catch(err) {
			console.log(err)
			return ''
		}
	}

	function process(results) {
		return results.filter(res => !!res.feedUrl)
	}

	const handleSubmit = () => {
		search(search_query)
	}
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

	a {
		font-size: 1rem;
		color: tomato;
		padding: 0.5rem;
	}
</style>

<main>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="rss-input">Search for a podcast</label>
		<input
			id="rss-input"
			bind:value={search_query} 
			type="text"
			placeholder="i.e. Shoptalk Show"
		>
		<button type="submit">Search</button>
	</form>
	<hr />
	<ul class="results">
		{#each results as result, i}
			<li>
				<article>
					<img src={result.artworkUrl100} alt={result.trackName}>
					<p>{result.artistName}</p>
					<h1>{result.trackName}</h1>
					<a href={parse(result.feedUrl)}>Go</a>
				</article>
			</li>
		{/each}
	</ul>
</main>