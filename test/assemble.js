import tap from 'tap'
import { assemble } from '../src/assemble'
import btoa from 'btoa'

global.btoa = btoa

const test_pairs = [
  ['https://feeds.megaphone.fm/replyall', 'https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkcy5tZWdhcGhvbmUuZm0vcmVwbHlhbGw'],
  ['https://feed.syntax.fm/rss', 'https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkLnN5bnRheC5mbS9yc3M'],
  ['https://shoptalkshow.com/feed/podcast/', 'https://podcasts.google.com/?feed=aHR0cHM6Ly9zaG9wdGFsa3Nob3cuY29tL2ZlZWQvcG9kY2FzdC8'],
  ['https://www.npr.org/rss/podcast.php?id=510310', 'https://podcasts.google.com/?feed=aHR0cHM6Ly93d3cubnByLm9yZy9yc3MvcG9kY2FzdC5waHA_aWQ9NTEwMzEw']
]

test_pairs.forEach(([ feedUrl, feedId ]) => {
  tap.equal(assemble(feedUrl), feedId)
})