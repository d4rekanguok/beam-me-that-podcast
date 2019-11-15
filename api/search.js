const got = require('got')

module.exports = async function(req, res) {
  const { query } = req.body
  try {
    const { body: results } = await got(
      `https://itunes.apple.com/search?attribute=titleTerm&entity=podcast&term=${query}`, 
      { json: true },
    )

    res.status(200).json(results)
  } catch(err) {
    res.status(400).json({ errors: err.message })
  }
}