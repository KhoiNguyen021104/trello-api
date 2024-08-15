/* eslint-disable no-console */
import express from 'express'
import { CLOSED_DB, CONNECT_DB, GET_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'

const START_SERVER = () => {
  const app = express()
  app.get('/', async (req, res) => {
    res.end(`Hello World ${env.AUTHOR}`)
  })
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
