import { StatusCodes } from 'http-status-codes'
import { registerService } from '~/services/registerService'

const updatePassAndName = async (req, res, next) => {
  try {
    const resUpdate = await registerService.updatePassAndName(req.body)
    res.status(StatusCodes.OK).json(resUpdate)
  } catch (error) {
    next(error)
  }
}

export const finalizeStepRegisterController = {
  updatePassAndName
}
