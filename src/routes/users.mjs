import hashPassword from '../hashPassword'
import User from '../db/models/User.mjs'

const users = (app) => {
  app.post('/users', async (req, res) => {
    const {
      ctx: { db },
      body: { email, password, fullname, username },
    } = req

    const [existingUser] = await db('users').where({ email })

    if (existingUser) {
      return res.status(200).send({ error: 'email already used' })
    }

    const { hash, salt } = hashPassword(password)

    const user = await User.query().insertAndFetch({
      email,
      fullname,
      username,
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.send(user.getSafeFields())
  })
}

export default users
