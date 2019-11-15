import { writable, derived } from 'svelte/store'
import { assemble } from './assemble'

export const search_query = writable('reply')
export const results = derived(search_query, search, [])
export const message = (function(){
  const { subscribe, set } = writable('')

  const done = (length = 0) => set(`Found ${length} podcast${length > 1 ? 's' : ''}`)
  const loading = () => set('loading...')
  const error = (err) => set(err)

  return { subscribe, done, loading, error }
})()

let timerId = false

async function search(query, set) {
  try {
    timerId && clearTimeout(timerId)

    if (query.trim() === '') {
      message.done()
      return set([])
    }

    timerId = setTimeout(async function () {
      message.loading()
      // const result = await fetch('.netlify/functions/search', {
      const result = await fetch('/sample.json', {
        method: 'POST',
        body: JSON.stringify({ query }),
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
    feedUrl: assemble(podcast.feedUrl),
  }))
}