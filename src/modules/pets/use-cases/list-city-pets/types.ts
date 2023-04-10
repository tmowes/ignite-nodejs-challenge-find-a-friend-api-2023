import { QueryPetsSchema } from '#shared/infra/http/controllers/pets/list/schemas'
import { Pet } from '@prisma/client'

export type ListCityPetsUseCaseRequest = {
  city: string
  query: QueryPetsSchema
}

export type ListCityPetsUseCaseResponse = {
  pets: Pet[]
}
