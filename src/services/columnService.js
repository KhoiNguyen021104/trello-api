/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    // console.log('createdColumn: ', createdColumn)
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
    // console.log('getNewColumn: ', getNewColumn)
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


export const columnService = {
  createNew
}
