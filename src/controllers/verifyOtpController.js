import { StatusCodes } from 'http-status-codes'
import { registerService } from '~/services/registerService'

const verify = async (req, res, next) => {
  try {
    const resVerify = await registerService.verifyOtp(req.body)
    res.status(StatusCodes.OK).json(resVerify)
  } catch (error) {
    next(error)
  }
}

export const verifyOtpController = {
  verify
}
