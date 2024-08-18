/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const createNew = async (req, res, next) => {
  console.log('req.body: ', req.body)
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    // title: Joi.string().min(3).max(50).trim().strict()
    //   .when('FE_PlaceholderCard', {
    //     is: true,
    //     // Nếu có `FE_PlaceholderCard`, `title` sẽ không bắt buộc
    //     then: Joi.optional(),
    //     // Nếu không có `FE_PlaceholderCard`, `title` sẽ bắt buộc
    //     otherwise: Joi.required()
    //   }),
    // // optional: chỉ validate nếu tồn tại key
    // FE_PlaceholderCard: Joi.boolean().optional(),
    // Hiện tại chưa có chức năng viết desc
    // description: Joi.string().required().min(3).max(50).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate => successful => next => Ctrl / Mw
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const cardValidation = {
  createNew
}