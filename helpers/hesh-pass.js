const bcrypt = require('bcrypt')
const chalk = require('chalk')

module.exports = (pass) => {
    return bcrypt.hash(pass, 10)
}
