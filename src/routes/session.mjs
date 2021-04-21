import uuid from 'uuid'

import User from '../db/models/User'

const session = (app) => {
  app.get('/session', async (req, res) => {
    res.send({ status: 'ok', data: req.session })
  })
  // sign-in
  app.post('/session', async (req, res) => {
    const {
      ctx: { redis },
      body: { email, password },
    } = req

    const user = await User.query().findOne({ email })

    if (!user) {
      return res.status(401).send({ error: 'invalid credentials' })
    }

    if (user.checkPassword(password)) {
      return res.status(401).send({ error: 'invalid credentials' })
    }

    const id = uuid.v4()
    const data = { userId: user.id }
    await redis.set(`session:${id}`, JSON.stringify(data))

    res.setCookie('session', id)
    res.send({ status: 'ok', data })
  })
  // sign-out
  app.delete('/session', async (req, res) => {
    const id = req.cookies.session
    if (!id) {
      return res.send({ error: 'no session' })
    }

    await req.ctx.redis.del(`session:${id}`)
    res.send({ status: 'ok' })
  })
}

export default session
