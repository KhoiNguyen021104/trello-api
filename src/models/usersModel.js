import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const USERS_COLLECTION_NAME = 'users'
const USERS_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
})

const login = async (data) => {
  try {
    const result = await GET_DB().collection(USERS_COLLECTION_NAME).findOne({
      email: data.email
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getUserInfo = async (_id) => {
  try {
    const result = await GET_DB().collection(USERS_COLLECTION_NAME).findOne({
      _id: new ObjectId(_id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const usersModel = {
  USERS_COLLECTION_NAME,
  USERS_COLLECTION_SCHEMA,
  login,
  getUserInfo
}
