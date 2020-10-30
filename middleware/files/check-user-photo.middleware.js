const chalk = require('chalk')

const {Constants} = require('../../configs')
const {ErrorEnum, ErrorEnumStatus, ErrorHandle} = require('../../errors')

module.exports = (req, res, next) => {
    try {
        if (!req.files) {
            next()
        }

        const photos = []

        const files = Object.values(req.files)

        if (!files) {
            next()
        }
        else {

            for (let i = 0; i < files.length; i++) {
                const {size, mimetype} = files[i]



                if (!Constants.MIMETYPE_PHOTOS.includes(mimetype)) {
                    return next(new ErrorHandle(
                        ErrorEnum.NOT_VALID_USER.message,
                        ErrorEnumStatus.NOT_VALID_USER,
                        ErrorEnum.NOT_VALID_USER.customCode
                    ))
                }

                if (size > 5 * Constants.BYTE_TO_MB) {
                    return next(new ErrorHandle(
                        ErrorEnum.NOT_VALID_USER.message,
                        ErrorEnumStatus.NOT_VALID_USER,
                        ErrorEnum.NOT_VALID_USER.customCode
                    ))
                } else {


                    photos.push(files[i])
                }

            }
        }

        if (photos.length > 0 ) {
            req.avatar = photos[0]
        }

        next()
    }
    catch (e) {
        next(chalk.yellow(e))
    }
}
