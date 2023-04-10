import { Pet } from '@prisma/client'

export type CreatePetUseCaseRequest = {
  orgId: string
  name: string
  description: string
  age: string
  energy: number
  independence: string
  size: string
  type: string
  photos: { filename: string }[]
}

export type CreatePetUseCaseResponse = {
  pet: Pet
}
