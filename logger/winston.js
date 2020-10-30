const winston = require('winston')
const path = require('path')

module.exports = (label) => {

const logger = winston.createLogger({
transports: [
    new winston.transports.Console ({
        level: 'info',
        format: winston.format.combine(
            winston.format.label(label),
            winston.format.colorize({colors: {info: 'yellow', error: 'red'}, all: true})
        )
    }),

    new winston.transports.File({
        level: 'error',
        filename: path.join(process.cwd(), 'logger', 'error.txt'),
        format: winston.format.combine(
            winston.format.label(label),
            winston.format.json({space: 2}),
            winston.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss'
            })
        )
    })
]
})

    return {
        info: (err) => {
return logger.info(err)
        },

        err: (err) => {
return logger.error(err)
        }
    }
}
