import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu
    const createdBoard = await boardService.createNew(req.body)
    // return kết quả => Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) /**  => chạy đến app.use(errorHandlingMiddleware) trong server.js */}
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}

const moveCardDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardDifferentColumn(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}
export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardDifferentColumn
}