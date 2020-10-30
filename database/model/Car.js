const {dbConf} = require('../../configs')

module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
        idcars: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: dbConf.db_cars,
            timestamps: false
        })

    return Car
}
