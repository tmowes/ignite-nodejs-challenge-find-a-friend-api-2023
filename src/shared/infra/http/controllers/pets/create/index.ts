import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreatePetUseCase } from '#modules/pets/factories/make-create-pet-use-case'

import { createPetBodySchema, createPetFilesSchema } from './schemas'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, age, energy, independence, size, type } = createPetBodySchema.parse(
    request.body,
  )

  const photos = createPetFilesSchema.parse(request.files)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    orgId: request.user.sub,
    name,
    description,
    age,
    energy,
    independence,
    size,
    type,
    photos,
  })

  return reply.status(201).send()
}
