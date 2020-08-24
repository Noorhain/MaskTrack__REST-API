const app = require('./app')
const logger = require('./config/logger')
const port = process.env.PORT

app.listen(port, () => {
    logger.info('Server is up on port ' + port)
})