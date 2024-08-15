import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  try {
    //
    console.log('req.body: ', req.body)
    // throw new ApiError(StatusCodes.BAD_REQUEST, 'Test error')
    res.status(StatusCodes.CREATED).json({ message: 'POST-Controller: APIs create new board' })
  } catch (error) { next(error) /**  => chạy đến app.use(errorHandlingMiddleware) trong server.js */}
}

export const boardController = {
  createNew
}