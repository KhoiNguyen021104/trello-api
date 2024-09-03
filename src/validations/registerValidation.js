/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    otp: Joi.string().min(6).max(6).required()
  })

  try {
    await correctCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const registerValidation = {
  createNew
}