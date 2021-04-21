import hashPassword from '../hashPassword'
import getSafely from '../db/getSafely'

const users = (app) => {
  app.post('/users', async (req, res) => {
    const {
      ctx: { db },
      body: { email, password },
    } = req

    const [existingUser] = await db('users').where({ email })

    if (existingUser) {
      return res.status(200).send({ error: 'email already used' })
    }

    const { hash, salt } = hashPassword(password)

    const [user] = await db('users')
      .insert({
        email,
        passwordHash: hash,
        passwordSalt: salt,
      })
      .returning('*')

    res.send(getSafely('user', user))
  })
}

export default users
