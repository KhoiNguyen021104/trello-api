import { StatusCodes } from 'http-status-codes'
import { sendMail } from '~/utils/sendMail'


const sendMailController = async (req, res, next) => {
  try {
    // console.log(req.body)
    const result = await sendMail(req.body)
    res.status(StatusCodes.OK).json(result.accepted)
    return req.body
  } catch (error) { next(error) }
}

export const mailController = {
  sendMailController
}