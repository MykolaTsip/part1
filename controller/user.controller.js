const chalk = require('chalk')
const uuid = require('uuid').v4()
const path = require('path')
const fs = require('fs')

const {userService, oauthService, emailService} = require('../services')
const {heshPass, comparePass, tokenazer} = require('../helpers')
const {Constants, emailAction} = require('../configs')
const {instanceTransaction} = require('../database').getInstance()

module.exports = {
    AllUsers: async (req, res) => {
        try {
            const users = await userService.allUsers()

            res.json(users)
        } catch (e) {
            console.log(chalk.red(e))
        }
    },

    CreateUser: async (req, res) => {
        const transaction = await instanceTransaction()
        try {

            const {body: user} = req

            user.password = await heshPass(user.password)

            const newUser = await userService.createUser(user, transaction)


            if (req.avatar) {
                const dirName = `/public/users/${newUser.id}`
                const fileExtension = req.avatar.name.split('.').pop()
                const photoName = `${uuid}.${fileExtension}`

                fs.mkdir(path.join(process.cwd(), dirName), {recursive: true}, err => {
                 if (err) {
                     console.log(err)
                 }
                })

              await  req.avatar.mv(path.join(process.cwd(), dirName, photoName))

                await  userService.updateUser({avatar: `${dirName}/${photoName}`}, newUser.id, transaction)
                    }


            await transaction.commit()

          // await emailService.sendMailer(newUser.email, emailAction.WELCOME, {userName: newUser.name})
            res.redirect('/users')
        } catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))
        }
    },

    LoginUser: async (req, res) => {
        const transaction = await instanceTransaction()
        try {
            const {password} = req.body
            const user = req.user

            await comparePass(password, user.password)

            const tokens = tokenazer()

            await oauthService.createToken(tokens, user.id, transaction)


            await transaction.commit()
            res.json(tokens)
        } catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))
        }
    },

    DeleteUser: async (req, res) => {
        const transaction = await instanceTransaction()
        try {
            const user = req.user

            await oauthService.deleteToken({user_id: user.id}, transaction)
            await userService.deleteUserById(user.id, transaction)

            await transaction.commit()
            res.json(`user: ${user.name} is delete!`)
        } catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))

        }
    },

    RefreshToken: async (req, res) => {
        const transaction = await instanceTransaction()
        try {
            const oldToken = req.get(Constants.AUTHORIZATION)
            const newToken = tokenazer()
            const user = req.user

            await oauthService.deleteToken({refresh_token: oldToken}, transaction)
            await oauthService.createToken(newToken, user.id, transaction)

            await transaction.commit()
            res.json(newToken)
        } catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))
        }
    }
}
