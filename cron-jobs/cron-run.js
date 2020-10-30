const cron = require('node-cron')
const chalk = require('chalk')
const dayjs = require('dayjs')

const clearOldTokens = require('./delete-token')

module.exports = () => {
    try {
        cron.schedule('* * */3 * *', async () => {
            console.log(chalk.bold('ITAR START'))
          await  clearOldTokens()
            console.log(chalk.bold('ITAR END'))
        })

        cron.schedule('* * * * * *', () => {
            console.log('SECOND')
            console.log(dayjs().subtract(3, "hour").format('hh:mm:ss'))
            console.log('SECOND')
        })
    } catch (e) {
        console.log(chalk.bold(e))
    }
}
