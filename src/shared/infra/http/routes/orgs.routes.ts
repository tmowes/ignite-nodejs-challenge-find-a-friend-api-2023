import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { profile } from '../controllers/orgs/profile'
import { refresh } from '../controllers/orgs/refresh'
import { authenticate } from '../controllers/orgs/authenticate'
import { register } from '../controllers/orgs/register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register) // register new org
  app.post('/sessions', authenticate) // authenticate org
  app.patch('/token/refresh', refresh) // refresh org token

  /** Authenticated */
  app.get('/profile', { onRequest: [verifyJwt] }, profile) // show org profile
}
