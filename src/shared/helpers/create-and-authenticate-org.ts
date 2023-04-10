/* eslint-disable import/no-extraneous-dependencies */
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const orgExample = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
  address: 'Example street, 1234',
  zip: '01310-900',
  whatsapp: '11 91234.5678',
}

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send(orgExample)

  const authResponse = await request(app.server).post('/sessions').send({
    email: orgExample.email,
    password: orgExample.password,
  })

  const { token } = authResponse.body

  return { token }
}
