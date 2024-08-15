/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // throw new ApiError(410, 'test error service')
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    console.log(newBoard)
    // trả kết quả => bắt buộc
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}