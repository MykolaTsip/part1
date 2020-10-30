const chalk = require('chalk')

const {ErrorEnum, ErrorEnumStatus, ErrorHandle} = require('../errors')
const {userService} = require('../services')

module.exports = async (req, res, next) => {
    try {
        const user = req.body

        if (!user) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_USER.message,
                ErrorEnumStatus.NOT_VALID_USER,
                ErrorEnum.NOT_VALID_USER.customCode
            ))
        }

        const dbUser = await userService.getUserByName({name: user.name})

        if (!dbUser) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_USER.message,
                ErrorEnumStatus.NOT_VALID_USER,
                ErrorEnum.NOT_VALID_USER.customCode
            ))
        }

        req.user = dbUser

        next()

    }
    catch (e) {
        console.log(chalk.yellow(e))
        next(e)
    }
}
