const {Router} = require('express')

const {userController} = require('../controller')
const {validatorTypeMiddleware, loginUserMiddleware, tokensTypeMiddleware, file} = require('../middleware')

const userRouter = Router()

userRouter.get('/', userController.AllUsers)
userRouter.post('/create', validatorTypeMiddleware('user'), file.checkUserPhotoMiddleware, userController.CreateUser)
userRouter.post('/login', loginUserMiddleware,  userController.LoginUser)
userRouter.delete('/delete', tokensTypeMiddleware('access'), userController.DeleteUser )
userRouter.post('/refresh', tokensTypeMiddleware('refresh'), userController.RefreshToken)

module.exports = userRouter
