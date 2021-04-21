const auth = (req, res, next) => {
  if (req.session) {
    return next()
  }

  return res.status(401).send({ error: 'not allowed' })
}

export default auth
