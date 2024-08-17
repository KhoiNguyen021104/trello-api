/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { CLOSED_DB, CONNECT_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  // Cho phép sử dụng req.body => json
  app.use(express.json())
  app.use('/v1', APIs_V1)

  // Middlware sử lí lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    CLOSED_DB()
  })
}
(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
