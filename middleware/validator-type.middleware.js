const {carValid, userValid} = require('../validators')
const {ErrorEnum, ErrorHandle, ErrorEnumStatus} = require('../errors')
const chalk = require('chalk')
module.exports = (typeValid) => async (req, res, next) => {
    try {

        const infObj = req.body

        if (infObj) {
           if (typeValid === 'car') {
            const {error} = await carValid.validate(infObj)

               if (error) {

                   return next(new ErrorHandle(
                       ErrorEnum.NOT_VALID_CAR.message,
                       ErrorEnumStatus.NOT_VALID_CAR,
                       ErrorEnum.NOT_VALID_CAR.customCode
                   ))
               }
           }

           else if (typeValid === 'user') {
               const {error} = await userValid.validate(infObj)

               if (error) {
                   return  next(new ErrorHandle(
                       ErrorEnum.NOT_VALID_USER.message,
                       ErrorEnumStatus.NOT_VALID_USER,
                       ErrorEnum.NOT_VALID_USER.customCode
                   ))
               }
           }
           else {
               throw new Error(chalk.yellow('not valid object'))
           }

            }
        else {
            throw new Error(chalk.yellow('not object'))
        }

        next()
    }
    catch (e) {
        next(chalk.yellow(e))
    }
}
