const entities = {
  user: ({ id, email }) => ({ id, email }),
}

const getSafely = (entityName, entity) => {
  const fn = entities[entityName]

  if (!fn) {
    throw new Error(`no such entity "${entityName}"`)
  }

  return fn(entity)
}

export default getSafely
