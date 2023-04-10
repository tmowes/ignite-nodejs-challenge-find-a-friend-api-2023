import { FastifyReply, FastifyRequest } from 'fastify'

// eslint-disable-next-line consistent-return
export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
