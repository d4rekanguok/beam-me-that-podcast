<script>
  import { saved } from '../store'

  const handleClear = (id) => () => {
    saved.remove(id)
  }
</script>
  
<style>
  section {
    position: sticky;
    top: 0;
    background-color: var(--bg-2);
    padding: 0 0.5rem;
    z-index: 100;
  }

  ul {
    display: flex;
    flex-wrap: row-wrap;
  }

  li {
    flex: 0 1 5rem;
    padding: 0 0.5rem;
    margin: 1rem 0;
    text-align: center;
  }
</style>

<section>
  <ul>
    {#each $saved as podcast, i (podcast.feedId)}
      <li>
        <a href={podcast.feedId} rel="noreferrer">
          <img src={podcast.artworkUrl100} alt={podcast.trackName}>
        </a>
        <button on:click={handleClear(podcast.feedId)}>Remove</button>
      </li>
    {/each}
  </ul>
</section>