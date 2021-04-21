import { pbkdf2Sync, randomBytes } from 'crypto'

const hashPassword = (
  password,
  salt = randomBytes(32).toString('hex'),
  iteration = 100000,
  keylen = 512,
  digest = 'sha3-512'
) => {
  const hash = pbkdf2Sync(password, salt, iteration, keylen, digest).toString(
    'hex'
  )

  return { salt, hash }
}

export default hashPassword
