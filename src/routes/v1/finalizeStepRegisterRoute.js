import express from 'express'
import { finalizeStepRegisterController } from '~/controllers/finalizeStepRegisterController'
import { finalizeStepRegisterValidation } from '~/validations/finalizeStepRegisterValidation'
const Router = express.Router()

Router.route('/')
  .post(finalizeStepRegisterValidation.updatePassAndName, finalizeStepRegisterController.updatePassAndName)

export const finalizeStepRegisterRoute = Router