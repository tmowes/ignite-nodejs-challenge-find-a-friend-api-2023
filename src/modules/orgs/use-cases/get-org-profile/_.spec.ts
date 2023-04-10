import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { InMemoryOrgsRepository } from '#modules/orgs/repositories/in-memory/in-memory-orgs'

import { GetOrgProfileUseCase } from '.'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      ...orgExample,
      password_hash: await hash(orgExample.password, 6),
    })

    const { org } = await sut.execute({ orgId: createdOrg.id })

    expect(org.name).toEqual(orgExample.name)
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() => sut.execute({ orgId: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
