import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDetailsPetUseCase } from '#modules/pets/factories/make-details-pet-use-case'

import { detailsPetParamsSchema } from './schemas'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { petId } = detailsPetParamsSchema.parse(request.params)

  const getPetDetails = makeDetailsPetUseCase()

  const { pet } = await getPetDetails.execute({ petId })

  return reply.status(200).send({ pet })
}
