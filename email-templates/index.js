const {emailAction} = require('../configs')

module.exports = {

    [emailAction.WELCOME]: {
        subject: '[WELCOME USER] or hello world',
        templateFileName: 'welcome'
    },

    [emailAction.FORGOT_PASS]: {
        subject: '[FORGOT PASSWORD] or pass?',
        templateFileName: 'forgot-pass'
    }
}
