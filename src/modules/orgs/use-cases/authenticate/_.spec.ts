import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'
import { InMemoryOrgsRepository } from '#modules/orgs/repositories/in-memory/in-memory-orgs'

import { AuthenticateUseCase } from '.'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...orgExample,
      password_hash: await hash(orgExample.password, 6),
    })

    const { org } = await sut.execute({
      email: orgExample.email,
      password: orgExample.password,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: orgExample.email,
        password: orgExample.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      ...orgExample,
      password_hash: await hash(orgExample.password, 6),
    })

    await expect(() =>
      sut.execute({
        email: orgExample.email,
        password: `${orgExample.password}-wrong`,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
