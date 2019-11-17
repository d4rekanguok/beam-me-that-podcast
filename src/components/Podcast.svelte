<script>
  import { saved } from '../store'

  export let is_saved = false
  export let result = {
    artworkUrl100: '',
    trackName: '',
    artistName: '',
    feedUrl: '',
    feedId: '',
  }

  function handleSave() {
    saved.add(result)
  }
</script>

<style>
  article {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
  }

  .image {
    width: 20%;
    max-width: 6rem;
  }

  .image img {
    width: 100%;
  }

  .info {
    width: 75%;
    padding: 1rem;
  }

  .artist-name,
  .podcast-name {
    margin-bottom: 0.4rem;
  }

  .artist-name {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.8rem;
    letter-spacing: 0.02rem;
    opacity: 0.8;
  }

  .podcast-name {
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .feed-url {
    font-size: 0.8rem;
    opacity: 0.5;
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--pt-1);
    font-weight: bold;
  }

</style>

<li>
  <article>
    <div class="image">
      <img src={result.artworkUrl100} alt={result.trackName}>
    </div>
    <div class="info">
      <h2 class="artist-name">{result.artistName}</h2>
      <h1 class="podcast-name">{result.trackName}</h1>
      <p class="feed-url">{result.feedUrl}</p>
      <a href={result.feedId} title={result.trackName}>
        Listen
      </a>
      <button on:click={handleSave} disabled={is_saved}>
        {is_saved ? 'Saved' : 'Save'}
      </button>
    </div>
  </article>
</li>