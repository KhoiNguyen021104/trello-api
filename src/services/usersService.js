/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { usersModel } from '~/models/usersModel'

const login = async (reqBody) => {
  try {
    const resLogin = await usersModel.login(reqBody)
    return resLogin
  } catch (error) {
    throw error
  }
}

const getUserInfo = async (_id) => {
  try {
    const res = await usersModel.getUserInfo(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const usersService = {
  login,
  getUserInfo
}
