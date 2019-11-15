const got = require('got')
exports.handler = async function(event, context) {
  const { httpMethod } = event
  if (httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'POST only please' })
    }
  }

  const body = JSON.parse(event.body)
  const { query } = body
  try {
    console.log('happening...')
    const { body: results } = await got(
      `https://itunes.apple.com/search?attribute=titleTerm&entity=podcast&term=${query}`, 
      { json: true },
    )
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch(err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: err.message })
    }
  }
}