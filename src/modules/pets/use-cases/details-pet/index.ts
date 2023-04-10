import { PetsRepository } from '#modules/pets/repositories/pets.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { GetPetDetailsUseCaseRequest, GetPetDetailsUseCaseResponse } from './types'

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const { petId } = request

    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
