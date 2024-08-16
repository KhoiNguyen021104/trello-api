/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // throw new ApiError(410, 'test error service')
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    console.log('createdBoard: ', createdBoard)
    // createdBoard là obj json chứa insertedId và acknowledge của board
    // dựa vào _id để lấy info của board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log('getNewBoard: ', getNewBoard)

    // trả kết quả => bắt buộc
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}