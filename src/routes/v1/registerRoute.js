import express from 'express'
import { registerController } from '~/controllers/registerController'
import { registerValidation } from '~/validations/registerValidation'
const Router = express.Router()

Router.route('/')
  .post(registerValidation.createNew, registerController.createNew)

export const registerRoute = Router