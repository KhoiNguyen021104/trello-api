/* eslint-disable no-console */
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validateData = await validateBeforeCreate(data)
    console.log('validateData: ', validateData)
    // trả về data đã đc validate
    // check timestamp => new Date(timestamp)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    // insert 1 board
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        // match => điều kiện query
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        // tìm kiếm
        from: columnModel.COLUMN_COLLECTION_NAME,
        // id của board
        localField: '_id',
        // khóa ngoại id của board ở bảng column
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        // id của board
        localField: '_id',
        // khóa ngoại id của board ở bảng column
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()
    /**
     * aggregate return 1 tập hợp dữ liệu
     * => cần chuyển thành array có 1 ptu => [0]
     * as => đặt tên cho thuộc tính của object lấy được từ result 
     */
    console.log('result: ', result)
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}


/**
 * id: 66bf091ff8d0383207d508b7
 * colId:  66bf7e7785211e7a53c6860a
 * cardId: 66bf7f2b85211e7a53c6860e
 */