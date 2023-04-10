import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { authJwt } from '#configs/auth'
import { env } from '#configs/env'
import { contentParser } from '#configs/upload'
import { staticConfig } from '#configs/static'

import { appRoutes } from './routes'

export const app = fastify()

app.register(fastifyJwt, authJwt)

app.register(contentParser)

app.register(fastifyCookie)

app.register(appRoutes)

app.register(fastifyStatic, staticConfig)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
