import sessionRoute from './routes/session'
import usersRoute from './routes/users'

const routes = (app) => {
  sessionRoute(app)
  usersRoute(app)
}

export default routes
