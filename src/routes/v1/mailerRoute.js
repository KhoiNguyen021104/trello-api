import express from 'express'
import { mailController } from '~/controllers/mailController'

const Router = express.Router()

Router.route('/')
  .post(mailController.sendMailController)


export const mailerRoute = Router