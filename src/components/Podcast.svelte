<script>
  import { assemble } from '../assemble'

  export let result = {
    artworkUrl100: '',
    trackName: '',
    artistName: '',
    feedUrl: '',
  }
</script>

<style>

</style>

<li>
  <article>
    <img src={result.artworkUrl100} alt={result.trackName}>
    <p>{result.artistName}</p>
    <h1>{result.trackName}</h1>
    <a href={assemble(result.feedUrl)} title={result.trackName}>Go</a>
  </article>
</li>