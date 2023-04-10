import { PrismaOrgsRepository } from '../repositories/prisma/prisma-orgs'
import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  return new AuthenticateUseCase(orgsRepository)
}
