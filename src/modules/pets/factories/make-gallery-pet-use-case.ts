import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets'
import { GetPetDetailsUseCase } from '../use-cases/details-pet'

export function makeGalleryPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new GetPetDetailsUseCase(petsRepository)
}
