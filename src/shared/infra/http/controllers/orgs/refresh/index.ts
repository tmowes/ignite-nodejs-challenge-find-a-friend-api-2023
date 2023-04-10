import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const signJwt = { sub: request.user.sub }

  const token = await reply.jwtSign({}, { sign: signJwt })

  const refreshSign = { sub: request.user.sub, expiresIn: '7d' }

  const refreshToken = await reply.jwtSign({}, { sign: refreshSign })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
