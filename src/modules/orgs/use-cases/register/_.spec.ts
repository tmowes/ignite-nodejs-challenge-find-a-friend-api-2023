import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '#modules/orgs/repositories/in-memory/in-memory-orgs'
import { OrganizationAlreadyExistsError } from '#shared/errors/organization-already-exists'

import { RegisterUseCase } from '.'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should do register a  new org', async () => {
    const { org } = await sut.execute(orgExample)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute(orgExample)
    const isPasswordCorrectlyHashed = await compare(orgExample.password, org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(orgExample)

    await expect(() => sut.execute({ ...orgExample, email: orgExample.email })).rejects.toBeInstanceOf(
      OrganizationAlreadyExistsError,
    )
  })
})
