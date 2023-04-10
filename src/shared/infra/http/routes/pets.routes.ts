/* eslint-disable sonarjs/no-duplicate-string */
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { upload } from '#configs/upload'

import { verifyJwt } from '../middlewares/verify-jwt'
import { list } from '../controllers/pets/list'
import { create } from '../controllers/pets/create'
import { details } from '../controllers/pets/details'

const files = multer(upload)

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/details/:petId', details) // show pet details
  app.get('/pets/:city', list) // list pets by city

  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJwt], preHandler: files.array('photos', 6) }, create) // register new pets
}
