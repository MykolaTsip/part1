const {dbConf} = require('../configs')

module.exports = {
  "development": {
    "username": dbConf.db_user,
    "password": dbConf.db_user_pass,
    "database": dbConf.db_name,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
