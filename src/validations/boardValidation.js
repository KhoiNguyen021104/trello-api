/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(255).trim().strict()
  })

  try {
    /**
     * abortEarly: default => true => dùng validate nếu gắp lỗi
     * => false: validate hết các dữ liệu
     */
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate => successful => next => Ctrl / Mw
    next()
  } catch (error) {
    console.log('Error: ', error)
    // console.log('new Error: ', new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}


export const boardValidation = {
  createNew
}