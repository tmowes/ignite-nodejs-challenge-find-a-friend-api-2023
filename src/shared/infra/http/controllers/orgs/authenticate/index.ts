import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '#modules/orgs/factories/make-authenticate-use-case'

import { authenticateBodySchema } from './schemas'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { org } = await authenticateUseCase.execute({ email, password })

    const signJwt = { sub: org.id }
    const token = await reply.jwtSign({}, { sign: signJwt })

    const refreshSign = { sub: org.id, expiresIn: '7d' }
    const refreshToken = await reply.jwtSign({}, { sign: refreshSign })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
