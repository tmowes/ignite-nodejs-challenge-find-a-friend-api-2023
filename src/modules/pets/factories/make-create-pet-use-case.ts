import { PrismaOrgsRepository } from '#modules/orgs/repositories/prisma/prisma-orgs'

import { PrismaPetGalleryRepository } from '../repositories/prisma/prisma-gallery'
import { PrismaPetsRepository } from '../repositories/prisma/prisma-pets'
import { CreatePetUseCase } from '../use-cases/create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const galleryRepository = new PrismaPetGalleryRepository()
  return new CreatePetUseCase(petsRepository, orgsRepository, galleryRepository)
}
