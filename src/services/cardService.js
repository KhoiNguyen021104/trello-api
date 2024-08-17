/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const createdCard = await cardModel.createNew(newCard)
    // console.log('createdCard: ', createdCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    // console.log('getNewCard: ', getNewCard)

    if (getNewCard) {
      // cập nhật cardOrderIds => thêm card đc tạo vào column
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) {
    throw error
  }
}


export const cardService = {
  createNew
}
