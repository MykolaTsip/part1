const bcrypt = require('bcrypt')

module.exports =  (pass, heshPass) => {
    const isPass = bcrypt.compare(pass, heshPass)

    if (!isPass) {
        throw new Error('Error login')
    }

    return isPass
}
