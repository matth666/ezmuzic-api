import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Redis from 'ioredis'
import knex from 'knex'

import config from './config'
import routes from './routes'
import objection from 'objection'

const app = express()

const ctx = {
  redis: new Redis(config.redis),
  db: knex(config.knex),
}

// context
app.use((req, res, next) => {
  req.ctx = ctx

  objection.Model.knex(req.ctx.db)

  next()
})

// middlewares
app.use(cors(config.cors))
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
  // logger
  console.log(`[${new Date().toISOString()}] ${req.path}`)

  res.setCookie = (name, value, options) => {
    res.cookie(name, value, { ...config.cookie, ...options })
  }

  next()
})
app.use(async (req, res, next) => {
  const {
    ctx: { redis },
    cookies: { session: id },
  } = req

  const session = await redis.get(`session:${id}`)
  req.session = session ? JSON.parse(session) : null

  next()
})

// routes
routes(app)

app.use((err, req, res, next) => {
  if (!err) {
    return next()
  }

  console.error(err)

  res.send({ error: 'something went wrong' })
})

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
