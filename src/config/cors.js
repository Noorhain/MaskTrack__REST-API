const cors = require('cors')

const corsDone = cors({
  orgin: process.env.WEB_FRONTEND_CLIENT_URL
})
module.exports = cors({
  orgin: process.env.WEB_FRONTEND_CLIENT_URL
})
