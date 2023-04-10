import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '#modules/pets/repositories/in-memory/in-memory-pets'
import { InMemoryOrgsRepository } from '#modules/orgs/repositories/in-memory/in-memory-orgs'
import { InMemoryPetGalleryRepository } from '#modules/pets/repositories/in-memory/in-memory-gallery'
import { hash } from 'bcryptjs'

import { CreatePetUseCase } from '.'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',

  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

const petExample = {
  name: 'Alfredo',
  description: 'Um lindo cão',
  age: 'cub',
  size: 'medium',
  city: 'São Paulo',
  energy: 3,
  independence: 'high',
  type: 'dog',
  photos: [{ filename: 'petExample.png' }],
}

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let galleryRepository: InMemoryPetGalleryRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    galleryRepository = new InMemoryPetGalleryRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository, galleryRepository)
  })

  it('should to create pet', async () => {
    const password_hash = await hash('123456', 6)
    const org = await orgsRepository.create({ ...orgExample, password_hash })

    const { pet } = await sut.execute({ ...petExample, orgId: org.id })

    expect(pet.id).toEqual(expect.any(String))
  })
})
