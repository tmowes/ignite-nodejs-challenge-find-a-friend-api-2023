import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListCityPetsUseCase } from '#modules/pets/factories/make-list-city-pets-use-case'

import { listCityPetsParamsSchema, listCityPetsQuerySchema } from './schemas'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const { city } = listCityPetsParamsSchema.parse(request.params)

  const query = listCityPetsQuerySchema.parse(request.query)

  const listCityPetsUseCase = makeListCityPetsUseCase()

  const { pets } = await listCityPetsUseCase.execute({ city, query })

  return reply.status(200).send({ pets })
}
