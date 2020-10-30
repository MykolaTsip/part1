const chalk = require('chalk')

const {carService} = require('../services')
const {instanceTransaction} = require('../database').getInstance()

module.exports = {
    AllCars: async (req, res) => {
        try {
            const cars = await carService.allCars()

            res.json(cars)
        }
        catch (e) {
            console.log(chalk.red(e))
        }
    },
    NewCar: async (req, res) => {
        const transaction = await instanceTransaction()
        try {

            req.body.user_id = req.user.id

            const newCar = await carService.newCar(req.body, transaction)

            await transaction.commit()
            res.json(newCar)
        }
        catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))
        }
    },

    UpdateCar: async (req, res) => {
        const transaction = await instanceTransaction()
        try {
            const updateCar = req.body

             await carService.getCar({user_id: req.user.id}, transaction)


            await carService.updateCar({
                year: updateCar.year,
                price: updateCar.price
            },
                {model: updateCar.model}, transaction)

            await transaction.commit()
            res.json(`car: ${updateCar.model} is update!`)
        }
        catch (e) {
            await transaction.rollback()
            console.log(chalk.red(e))
        }
    }
}
