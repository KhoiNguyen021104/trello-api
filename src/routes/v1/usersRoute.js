import express from 'express'
import { usersController } from '~/controllers/usersController'
import { usersValidation } from '~/validations/usersValidation'

const Router = express.Router()

Router.route('/login')
  .post(usersValidation.login, usersController.login)

Router.route('/logout')
  .delete(usersController.logout)

Router.route('/refresh_token')
  .put(usersController.refreshToken)

Router.route('/getUser/:_id')
  .get(usersValidation.getUserInfo, usersController.getUserInfo)

export const usersRoute = Router
