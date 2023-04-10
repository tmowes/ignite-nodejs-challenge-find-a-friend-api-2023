import { FastifyReply, FastifyRequest } from 'fastify'
import { OrganizationAlreadyExistsError } from '#shared/errors/organization-already-exists'
import { makeRegisterUseCase } from '#modules/orgs/factories/make-register-use-case'

import { registerBodySchema } from './schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password, address, whatsapp, zip } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password, address, whatsapp, zip })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
