import express from 'express'
import { verifyOtpController } from '~/controllers/verifyOtpController'
import { verifyOtpValidation } from '~/validations/verifyOtpValidation'
const Router = express.Router()

Router.route('/')
  .post(verifyOtpValidation.verify, verifyOtpController.verify)

export const verifyOtpRoute = Router