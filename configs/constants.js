const dotenv = require('dotenv')

dotenv.config({})

module.exports = {
    AUTHORIZATION  : 'Authorization',

    EMAIL_USER: process.env.ROOT_EMAIL || 'enter please email login',
    EMAIL_USER_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'enter please email password',

    MIMETYPE_PHOTOS: ['image/gif', 'image/jpeg', 'image/png', 'image/webp'],

    BYTE_TO_MB: 1024*1024


}
