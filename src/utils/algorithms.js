/* eslint-disable no-console */
import bcrypt from 'bcrypt'

// const bcrypt = require('bcrypt')
const saltRounds = 10 // Số vòng salt

// Hàm để mã hóa mật khẩu
export async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (err) {
    console.error(err)
  }
}

export async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (err) {
    console.error(err)
  }
}
