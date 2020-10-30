const chalk = require('chalk')
const jwt = require('jsonwebtoken')

const {ErrorHandle, ErrorEnumStatus, ErrorEnum} = require('../errors')
const {tokenConf, Constants} = require('../configs')
const {oauthService} = require('../services')

module.exports = (typeToken) => async (req, res, next) => {
    try {
        let secretWord = ''
        let keyName = '';

        switch (typeToken) {

            case 'access':
                secretWord = tokenConf.ACCESS_TOKEN_SECRET
                keyName = 'access_token'
                break;

            case 'refresh':
                secretWord = tokenConf.REFRESH_TOKEN_SECRET
                keyName = 'refresh_token'
                break;

            default:
                return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_TOKEN.message,
                ErrorEnumStatus.NOT_VALID_TOKEN,
                ErrorEnum.NOT_VALID_TOKEN.customCode
            ))
        }

        const token = req.get(Constants.AUTHORIZATION)

        if (!token) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_TOKEN.message,
                ErrorEnumStatus.NOT_VALID_TOKEN,
                ErrorEnum.NOT_VALID_TOKEN.customCode
            ))
        }

        jwt.verify(token, secretWord, e => {
            if (e) {
                return next(new ErrorHandle(
                    ErrorEnum.NOT_VALID_TOKEN.message,
                    ErrorEnumStatus.NOT_VALID_TOKEN,
                    ErrorEnum.NOT_VALID_TOKEN.customCode
                ))
            }
        })

       const dbtoken = await  oauthService.getTokenByParams({[keyName]: token})

        if (!dbtoken) {
            return next(new ErrorHandle(
                ErrorEnum.NOT_VALID_TOKEN.message,
                ErrorEnumStatus.NOT_VALID_TOKEN,
                ErrorEnum.NOT_VALID_TOKEN.customCode
            ))
        }

        req.user = dbtoken.User



        next()
    }
    catch (e) {
        console.log(chalk.yellow(e))
    }
}
