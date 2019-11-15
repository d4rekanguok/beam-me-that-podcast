<script>
  import { saved } from '../store'

  const handleClear = (id) => () => {
    saved.remove(id)
  }
</script>
  
<style>
  section {
    background-color: var(--bg-2);
    padding: 1rem 0.5rem;
  }

  ul {
    display: flex;
    flex-wrap: row-wrap;
  }

  li {
    flex: 0 1 5rem;
    padding: 0 0.5rem;
    text-align: center;
  }
</style>

<section>
  <ul>
    {#each $saved as podcast, i (podcast.feedId)}
      <li>
        <a href={podcast.feedId}>
          <img src={podcast.artworkUrl100} alt={podcast.trackName}>
        </a>
        <button on:click={handleClear(podcast.feedId)}>Remove</button>
      </li>
    {/each}
  </ul>
</section>