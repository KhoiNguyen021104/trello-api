import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/environment'
import { JWTProvider } from '~/providers/jwtProvider'
import { usersService } from '~/services/usersService'
import { comparePassword } from '~/utils/algorithms'

const login = async (req, res) => {
  try {
    const resLogin = await usersService.login(req.body)
    if (!resLogin) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Your email or password is incorrect!', type: 'error' })
    }
    const password = req.body.password
    const hashedPassword = resLogin.password
    const resComparePassword = await comparePassword(password, hashedPassword)
    if (!resComparePassword) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Your email or password is incorrect!', type: 'error' })
    }
    const userInfo = {
      _id: resLogin._id,
      email: resLogin.email
    }
    const accessToken = await JWTProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5 // 5s
      '1h'
    )
    const refreshToken = await JWTProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      // 15
      '14 days'
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json({ message: 'Logout success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // lấy refresh token đc đính kèm ở Cookie của req
    const refreshTokenFromCookie = req.cookies?.refreshToken

    // Verify refresh token
    const refreshTokenDecoded = await JWTProvider.verifyToken(
      refreshTokenFromCookie,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )

    const userInfo = {
      _id: refreshTokenDecoded._id,
      email: refreshTokenDecoded.email
    }

    const accessToken = await JWTProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5 // 5s
      '1h'
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Refresh token failed')
  }
}

const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await usersService.getUserInfo(req.params._id)
    res.status(StatusCodes.OK).json(userInfo)
  } catch (error) {
    next(error)
  }
}

export const usersController = {
  login,
  logout,
  refreshToken,
  getUserInfo
}