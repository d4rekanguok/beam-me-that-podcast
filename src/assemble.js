const HOST = `https://podcasts.google.com/?feed=`

export function remove_padding(str) {
  return str.replace(/={1,2}$/, '')
}

/**
 * Turn a rss address to google podcst feed id
 * @param {string} feedUrl
 * @returns {string}
 */
export function assemble(feedUrl) {
  try {
    const parts = feedUrl.split('?')
    const feed_id = parts
      .filter(value => value).map(btoa).map(remove_padding).join('_')
    return HOST + feed_id
  } catch(err) {
    console.log(err)
    return ''
  }
}