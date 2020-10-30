const dotenv = require('dotenv')

dotenv.config({})

module.exports = {
    db_name: process.env.DB_NAME || 'auto_shop',
    db_user: process.env.DB_USERNAME || 'root',
    db_user_pass: process.env.DB_USERNAME_PASS || 'root',

    db_cars: 'cars',
    db_users: 'users',
    db_oauth: 'oauth'
}


