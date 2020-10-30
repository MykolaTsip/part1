const {Router} = require('express')

const {carController} = require('../controller')
const {tokensTypeMiddleware, validatorTypeMiddleware} = require('../middleware')

const carRouter = Router()

carRouter.get('/', carController.AllCars)

carRouter.post('/new',
    tokensTypeMiddleware('access'),
    validatorTypeMiddleware('car'),
    carController.NewCar)

carRouter.post('/update',
    tokensTypeMiddleware('access'),
    validatorTypeMiddleware('car'),
    carController.UpdateCar
    )

module.exports = carRouter
