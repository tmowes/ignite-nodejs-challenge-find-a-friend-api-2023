import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { InMemoryPetsRepository } from '#modules/pets/repositories/in-memory/in-memory-pets'

import { GetPetDetailsUseCase } from '.'

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
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create(petExample)

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.name).toEqual(petExample.name)
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() => sut.execute({ petId: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
