const mailer = require('nodemailer')
const EmailTemplates = require('email-templates')
const path = require('path')
const chalk = require('chalk')

const {Constants} = require('../configs')
const htmlTemplate = require('../email-templates')

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: Constants.EMAIL_USER,
        pass: Constants.EMAIL_USER_PASSWORD
    }
})


class EmailService {
    async sendMailer(userEmail, action, context) {
        try {
            const templateInfo = htmlTemplate[action]
            const html = await emailTemplates.render(templateInfo.templateFileName, {
                ...context,
                site: 'https://www.youtube.com/watch?v=l9nh1l8ZIJQ'
            })

            const mailOptions = {
                from: 'no car',
                to: userEmail,
                subject: templateInfo.subject,
                html
            }

            return transporter.sendMail(mailOptions)

        } catch (e) {
            console.log(chalk.red(e))
        }
    }
}

module.exports = new EmailService()
