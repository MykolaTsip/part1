const jwt = require('jsonwebtoken')

const {tokenConf} = require('../configs')

module.exports = () => {
   const access_token = jwt.sign({a: 'b'}, tokenConf.ACCESS_TOKEN_SECRET, {expiresIn: '3m'})
    const refresh_token = jwt.sign({b: 'bc'}, tokenConf.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})


    return {
       access_token,
        refresh_token
    }
}
