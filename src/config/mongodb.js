// khoinguyendev
// uk0zjyzxh6LCiVEj


import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// Đối tượng kết nối DB
let trelloDatabaseInstance = null

// Khởi tạo đối tượng mongo client instance => kết nối DB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối DB
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('No Connection')
  return trelloDatabaseInstance
}

// Đóng kết nối DB
export const CLOSED_DB = async () => {
  await mongoClientInstance.close()
}