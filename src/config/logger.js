const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            level: 'info',
            filename:   '../logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false
        })
    ]
})

module.exports = logger