/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    // throw new ApiError(410, 'test error service')
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log('createdBoard: ', createdBoard)
    // createdBoard là obj json chứa insertedId và acknowledge của board
    // dựa vào _id để lấy info của board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log('getNewBoard: ', getNewBoard)

    // trả kết quả => bắt buộc
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board)
      throw new ApiError(StatusCodes.NOT_FOUND).message('Board not found')
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })
    delete resBoard.cards
    console.log('resBoard: ', resBoard)
    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}
