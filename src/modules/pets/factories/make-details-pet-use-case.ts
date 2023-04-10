import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets'
import { GetPetDetailsUseCase } from '../use-cases/details-pet'

export function makeDetailsPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new GetPetDetailsUseCase(petsRepository)
}
