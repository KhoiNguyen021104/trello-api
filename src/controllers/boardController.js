import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu
    const createdBoard = await boardService.createNew(req.body)

    // return kết quả => Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) /**  => chạy đến app.use(errorHandlingMiddleware) trong server.js */}
}

export const boardController = {
  createNew
}