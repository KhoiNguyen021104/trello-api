/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

import { JWTProvider } from '~/providers/jwtProvider'


const isAuthorized = async (req, res, next) => {
  const accessTokenFromCookie = req.cookies?.accessToken

  if (!accessTokenFromCookie) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized! (Access Token not found)' })
    return
  }

  try {
    const accessTokenDecoded = await JWTProvider.verifyToken(
      accessTokenFromCookie,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    )
    // b2: hợp lệ => lưu thông tin giải mã vào req.jwtDecoded
    req.jwtDecoded = accessTokenDecoded
    next()
  } catch (error) {
    console.log('Error from middleware: ', error)
    // TH lỗi 1: Nếu accessToken đc gửi lên từ FE đã hết hạn
    // => return lỗi 410 - GONE => FE gọi lại refreshToken
    if (error.message?.includes('jwt expired')) {
      res.status(StatusCodes.GONE).json({ message: 'Need to refresh token' })
      return
    }
    // TH2: Nếu như accessToken k hợp lệ do bất kì lỗi nào khác
    // => return lỗi 401 => FE xử lí logout / call API logout
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized! Please login' })
  }
}


export const authMiddleware = {
  isAuthorized
}