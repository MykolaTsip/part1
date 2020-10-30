const chalk = require('chalk')

const db = require('../database').getInstance()

module.exports = {
    allCars: () => {
        try {
            const cars = db.getModels('Car')

            return cars.findAll({})
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    getCar: (userId, transaction) => {
      try {
          const car = db.getModels('Car')

          return car.findAll({
              where: userId,
              transaction
          })
      }
      catch (e) {
          console.log(chalk.blue(e))
      }
    },

    newCar: (carObj, transaction) => {
        try {
            const newCar = db.getModels('Car')

            return newCar.create(carObj, {new: true, transaction})
        } catch (e) {
            console.log(chalk.blue(e))
        }
    },

    updateCar: (updateObj, carModel, transaction) => {
        const updateCar = db.getModels('Car')

        return updateCar.update({
                updateObj
            },
            {
                where: carModel,
                returning: true,
                plain: true,
                transaction
            }
        )
    }
}
