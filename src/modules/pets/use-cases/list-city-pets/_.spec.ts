import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '#modules/pets/repositories/in-memory/in-memory-pets'

import { ListCityPetsUseCase } from '.'

const petExample = {
  org_id: 'org-01',
  name: 'Alfredo',
  description: 'Um lindo cão',
  age: 'cub',
  size: 'medium',
  city: 'São Paulo',
  energy: 3,
  independence: 'high',
  type: 'dog',
  photo: 'petExample.png',
}

let petsRepository: InMemoryPetsRepository
let sut: ListCityPetsUseCase

describe('List city pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListCityPetsUseCase(petsRepository)
  })

  it('should be able to list city pets', async () => {
    const createdPet = await petsRepository.create(petExample)

    const { pets } = await sut.execute({ city: createdPet.city, query: {} })

    expect(pets.length).toEqual(1)
  })
})
