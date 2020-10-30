const chalk = require('chalk')

const db = require('../database').getInstance()

module.exports = {
    allUsers: () => {
        try {
            const users = db.getModels('User')

            return users.findAll({})
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    createUser: (userObj, transaction) => {
        try {

            const user = db.getModels('User')

            return user.create(userObj, {new: true, transaction})
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    getUserByName: (userName) => {
        try {
            const user = db.getModels('User')

            return user.findOne({
                where: userName
            })
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },


    updateUser: (updateObj, idUser, transaction) => {
        try {
            const user = db.getModels('User')

            return user.update(
                updateObj,
                {
                    where: {id: idUser},
                    returning: true,
                    plain: true,
                    transaction
                }
            )
        } catch (e) {
            console.log(chalk.blue(e))

        }
    },


    deleteUserById: (userId, transaction) => {
        try {
            const user = db.getModels('User')

            return user.destroy({
                where: {id: userId, transaction}
            })
        } catch (e) {
            console.log(chalk.blue(e))
        }
    }
}
