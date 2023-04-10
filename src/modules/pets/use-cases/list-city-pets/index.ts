import { PetsRepository } from '#modules/pets/repositories/pets.repository'

import { ListCityPetsUseCaseRequest, ListCityPetsUseCaseResponse } from './types'

export class ListCityPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(request: ListCityPetsUseCaseRequest): Promise<ListCityPetsUseCaseResponse> {
    const { city, query } = request

    const pets = await this.petsRepository.listByCity(city, query)

    return { pets }
  }
}
