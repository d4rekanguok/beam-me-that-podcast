const HOST = `https://podcasts.google.com/?feed=`

/**
 * Turn a rss address to google podcst feed id
 * @param {string} feedUrl
 * @returns {string}
 */
export function assemble(feedUrl) {
  try {
    const parts = feedUrl.split('?')
    const feed_id = parts.filter(value => value).map(btoa).join('_')
    return HOST + feed_id
  } catch(err) {
    console.log(err)
    return ''
  }
}