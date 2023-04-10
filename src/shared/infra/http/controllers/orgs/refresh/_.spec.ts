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

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send(orgExample)

    const authResponse = await request(app.server).post('/sessions').send({
      email: orgExample.email,
      password: orgExample.password,
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server).patch('/token/refresh').set('Cookie', cookies).send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')])
  })
})
