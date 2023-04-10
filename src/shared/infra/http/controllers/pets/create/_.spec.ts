import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '#shared/infra/http/app'
import { createAndAuthenticateOrg } from '#shared/helpers/create-and-authenticate-org'
import { testFolder } from '#configs/upload'

const petExample = {
  name: 'Alfredo',
  description: 'Um lindo cão',
  age: 'cub',
  size: 'medium',
  energy: 3,
  independence: 'high',
  type: 'dog',
}

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', petExample.name)
      .field('description', petExample.description)
      .field('age', petExample.age)
      .field('size', petExample.size)
      .field('energy', petExample.energy)
      .field('independence', petExample.independence)
      .field('type', petExample.type)
      .attach('photos', `${testFolder}/test_example.jpeg`)
      .attach('photos', `${testFolder}/test_example.jpeg`)

    expect(response.statusCode).toEqual(201)
  })
})
