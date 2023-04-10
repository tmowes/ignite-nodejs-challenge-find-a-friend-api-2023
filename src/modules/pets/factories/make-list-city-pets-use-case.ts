import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets'
import { ListCityPetsUseCase } from '../use-cases/list-city-pets'

export function makeListCityPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new ListCityPetsUseCase(petsRepository)
}
