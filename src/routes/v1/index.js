import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { mailerRoute } from './mailerRoute'
import { registerRoute } from './registerRoute'
import { verifyOtpRoute } from './verifyOtpRoute'
import { finalizeStepRegisterRoute } from './finalizeStepRegisterRoute'


const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 are ready to use' })
})

Router.use('/boards', boardRoute)
Router.use('/columns', columnRoute)
Router.use('/cards', cardRoute)
Router.use('/sendMail', mailerRoute)
Router.use('/register', registerRoute)
Router.use('/verify-otp', verifyOtpRoute)
Router.use('/finalizeStepRegister', finalizeStepRegisterRoute)


export const APIs_V1 = Router