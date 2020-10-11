const cors = require('cors')

module.exports = cors(({
  origin: process.env.WEB_FRONTEND_CLIENT_URL

}))
