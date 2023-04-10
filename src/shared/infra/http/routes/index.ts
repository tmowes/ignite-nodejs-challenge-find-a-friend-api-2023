import { FastifyInstance } from 'fastify'

import { orgsRoutes } from './orgs.routes'
import { petsRoutes } from './pets.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(orgsRoutes)
  app.register(petsRoutes)
}
