const chalk = require('chalk')


const db = require('../database').getInstance()

module.exports = {
    createToken: (tokenObj, userid, transaction) => {
        try {
            const newToken = db.getModels('Oauth')

            return newToken.create({
                ...tokenObj,
                user_id: userid
            }, {new: true, transaction})
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    deleteToken: (params, transaction) => {
        try {
            const token = db.getModels('Oauth')

            return token.destroy({
                where: params,
                transaction

            })
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    getTokenByParams: (params, userAttr) => {
        try {
            const token = db.getModels('Oauth')
            const user = db.getModels('User')

            return token.findOne({
                where: params,
                raw: true,
                nest: true,
                include: [{
                    model: user,
                    attributes: userAttr
                }]
            })
        } catch (e) {
            console.log(chalk.blue(e))
        }
    }
}
