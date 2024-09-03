import { StatusCodes } from 'http-status-codes'
import { registerService } from '~/services/registerService'

const createNew = async (req, res, next) => {
  try {
    const createdUser = await registerService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

export const registerController = {
  createNew
}
