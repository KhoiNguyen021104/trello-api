import Joi from 'joi'
import { ObjectId } from 'mongodb'
import ms from 'ms'
import { GET_DB } from '~/config/mongodb'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const REGISTER_COLLECTION_NAME = 'users'
const REGISTER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  role: Joi.string().default('client'),
  isVerified: Joi.boolean().default(false),
  otp: Joi.string().min(6).max(6).required(),
  otpExpired: Joi.date().timestamp('javascript').default(Date.now() + ms('10m')),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})
const INVALID_UPDATE_FIELDS = ['createdAt', 'email']

const validateBeforeCreate = async (data) => {
  return await REGISTER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validateData = await validateBeforeCreate(data)
    return await GET_DB().collection(REGISTER_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(REGISTER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByEmail = async (email) => {
  try {
    const result = await GET_DB().collection(REGISTER_COLLECTION_NAME).findOne({
      email: email
    })
    if (result) return true
    return false
  } catch (error) {
    throw new Error(error)
  }
}

const verifyOtp = async (reqBody, updateData) => {
  try {
    Object.keys(updateData).forEach(key => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    const userData = await findOneById(reqBody._id)
    // Xác thực OTP
    const otpCorrect = userData.otp
    if (otpCorrect !== reqBody.otp) {
      return { message: 'OTP incorrect', type: 'error' }
    }

    // Kiểm tra OTP hết hạn
    const otpExpired = userData.otpExpired
    if (otpExpired - userData.updatedAt < 0) {
      return { message: 'OTP expired', type: 'error' }
    }

    const result = await GET_DB().collection(REGISTER_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(reqBody._id)
      },
      {
        $set: updateData
      },
      { returnDocument: 'after' }
    )
    return {
      ...result,
      message: 'Email verification successful',
      type: 'success'
    }
  } catch (error) {
    throw new Error(error)
  }
}

const updatePassAndName = async (reqBody, updateData) => {
  try {
    Object.keys(updateData).forEach(key => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    const result = await GET_DB().collection(REGISTER_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(reqBody._id)
      },
      {
        $set: updateData
      },
      { returnDocument: 'after' }
    )
    return {
      ...result,
      message: 'Register successful! You can sign in now.',
      type: 'success'
    }
  } catch (error) {
    throw new Error(error)
  }
}


export const registerModel = {
  REGISTER_COLLECTION_NAME,
  REGISTER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  verifyOtp,
  updatePassAndName,
  findOneByEmail
}
