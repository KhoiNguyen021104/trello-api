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
// Sử dụng hàm
// const password = 'yourPassword123';
// const hashedPassword = 'storedHashedPasswordHere'; // Mật khẩu đã mã hóa từ cơ sở dữ liệu

// comparePassword(password, hashedPassword).then(isMatch => {
//   console.log('Password Match:', isMatch);
// });
