/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const updatePassAndName = async (req, res, next) => {
  const correctCondition = Joi.object({
    displayName: Joi.string().trim().required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .required(),
    confirmPassword: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .required()
  })
  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}


export const finalizeStepRegisterValidation = {
  updatePassAndName
}