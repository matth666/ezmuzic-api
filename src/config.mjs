export default {
  port: process.env.PORT,
  redis: {
    host: process.env.REDIS_HOST,
  },
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  knex: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
}
