import { Pet } from '@prisma/client'

export type GetPetDetailsUseCaseRequest = {
  petId: string
}

export type GetPetDetailsUseCaseResponse = {
  pet: Pet
}
