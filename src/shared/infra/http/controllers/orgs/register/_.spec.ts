import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '#shared/infra/http/app'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new org', async () => {
    const response = await request(app.server).post('/orgs').send(orgExample)

    expect(response.statusCode).toEqual(201)
  })
})
