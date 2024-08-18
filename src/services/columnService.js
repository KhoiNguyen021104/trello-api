/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    /**
     * VD: result returned
     * getNewColumn:  {
        _id: new ObjectId('66c0561b4042834b44762f75'),
        title: 'column 01',
        boardId: new ObjectId('66bf091ff8d0383207d508b7'),
        cardOrderIds: [],
        createdAt: 1723880987619,
        updatedAt: null,
        _destroy: false
        }
     */
    if (getNewColumn) {
      // thêm array cards vào trong column mới
      getNewColumn.cards = []
      // cập nhật columnOrderIds => thêm column đc tạo vào board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}

const deleteColumn = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }

    // Xóa col
    await columnModel.deleteOneById(columnId)
    // Xóa card trong col
    await cardModel.deleteAllCardsByColumnId(columnId)
    // Xóa columnId khỏi columnOrderIds của board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards are deleted successfully!' }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  update,
  deleteColumn
}
