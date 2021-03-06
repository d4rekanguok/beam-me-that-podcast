import { writable, derived } from 'svelte/store'
import { assemble } from './assemble'

const LS_ID = 'beam-me-saved'

export const search_query = writable('')
export const results = derived(search_query, search, [])
export const message = (function(){
  const { subscribe, set } = writable('')

  const done = (length = 0) => set(`Found ${length} podcast${length > 1 ? 's' : ''}`)
  const loading = () => set('loading...')
  const error = (err) => set(err)

  return { subscribe, done, loading, error }
})()

export const saved = (function(){
  const maybe_saved = localStorage.getItem(LS_ID) || "[]"
  const { subscribe, update, set } = writable(JSON.parse(maybe_saved))

  const reset = () => set([])

  const add = (podcast) => update($saved => {
    const already_added = $saved.some(saved_pod => saved_pod.feedId === podcast.feedId)
    if (already_added) {
      console.warn(`saved.add: '${podcast.trackName}' is already added.`)
      return $saved
    }
    $saved.push(podcast)
    return $saved
  })
  
  const remove = (feedId) => update($saved => {
    const podcastId = $saved.findIndex(podcast => podcast.feedId === feedId)
    if (podcastId < 0) {
      console.warn('saved.remove: Podcast doesnt exists.')
      return $saved
    }
    $saved.splice(podcastId, 1)
    return $saved
  })

  subscribe($saved => {
    localStorage.setItem(LS_ID, JSON.stringify($saved))
  })

  return { subscribe, add, remove, reset }
})()

let timerId = false

async function search(query, set) {
  try {
    timerId && clearTimeout(timerId)

    // handle rss url
    if (query.startsWith('http')) {
      const custom_pod = [{
        artworkUrl100: './pod-default.png',
        trackName: query,
        artistName: 'Custom RSS URL',
        feedUrl: query,
      }]
      message.done(1)
      set(process(custom_pod))
      return
    }

    if (query.trim() === '') {
      message.done()
      return set([])
    }

    message.loading()
    set([])

    timerId = setTimeout(async function () {
      const result = await fetch('api/search', {
      // const result = await fetch('/sample.json', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (result.status !== 200) {
        message.error('Network error, try again later?')
      }
      const { results, errors } = await result.json()
  
      if (errors) {
        throw new Error(errors)
      }

      set(process(results))
      message.done(results.length)
    }, 200)

  } catch(err) {
    message.error(err)
    return set([])
  }
}

function process(results) {
  return results.filter(res => !!res.feedUrl).map(podcast => ({
    ...podcast,
    feedId: assemble(podcast.feedUrl),
  }))
}