/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { registerModel } from '~/models/registerModel'
import { hashPassword } from '~/utils/algorithms'

const createNew = async (reqBody) => {
  try {
    const exists = await registerModel.findOneByEmail(reqBody.email)
    if (exists) {
      return { message: 'Email already exists', type: 'error' }
    }

    const newUser = {
      ...reqBody
    }
    const createdUser = await registerModel.createNew(newUser)
    return createdUser
  } catch (error) {
    throw error
  }
}

const verifyOtp = async (reqBody) => {
  try {
    const updateData = {
      isVerified: true,
      updatedAt: Date.now()
    }
    const resVerify = await registerModel.verifyOtp(reqBody, updateData)
    return resVerify
  } catch (error) {
    throw error
  }
}

const updatePassAndName = async (reqBody) => {
  try {
    if (reqBody.password !== reqBody.confirmPassword) {
      return { message: 'Password confirmation mismatch', type: 'error' }
    }
    const hashedPassword = await hashPassword(reqBody.password)
    console.log('🚀 ~ hashPassword ~ hashedPassword:', hashedPassword)
    const updateData = {
      displayName: reqBody.displayName,
      password: hashedPassword,
      updatedAt: Date.now()
    }
    const resUpdate = await registerModel.updatePassAndName(reqBody, updateData)
    return resUpdate
  } catch (error) {
    throw error
  }
}

export const registerService = {
  createNew,
  verifyOtp,
  updatePassAndName
}
