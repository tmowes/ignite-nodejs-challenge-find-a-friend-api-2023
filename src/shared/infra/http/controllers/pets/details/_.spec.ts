import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '#shared/helpers/create-and-authenticate-org'
import { app } from '#shared/infra/http/app'
import { testFolder } from '#configs/upload'

const petExample = {
  name: 'Alfredo',
  description: 'Um lindo cão',
  age: 'cub',
  size: 'medium',
  city: 'São Paulo',
  energy: 3,
  independence: 'high',
  type: 'dog',
}

describe('Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to show pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    const cityPets = await request(app.server).get(`/pets/${petExample.city}`).send()

    const newPetId = cityPets.body.pets[0].id

    const response = await request(app.server).get(`/pets/details/${newPetId}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.name).toEqual(petExample.name)
  })
})
