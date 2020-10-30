const {Sequelize, DataTypes} = require('sequelize')
const path = require('path')
const fs = require('fs')

const {dbConf} = require('../configs')


module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(dbConf.db_name, dbConf.db_user, dbConf.db_user_pass, {
            host: 'localhost',
            dialect: 'mysql'
        })

        let models = {}

        function getModel() {
            fs.readdir(path.join(process.cwd(), 'database', 'model'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.')
                    models[modelName] = (require(path.join(process.cwd(), 'database', 'model', modelName)))(client, DataTypes)
                })
            })
        }

        return {
            setModel: () => getModel(),
            getModels: (modelName) => models[modelName],
            instanceTransaction: () => client.transaction()
        }

    }


    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }

            return instance
        }
    }
})()
