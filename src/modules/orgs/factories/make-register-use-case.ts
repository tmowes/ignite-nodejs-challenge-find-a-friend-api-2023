import { PrismaOrgsRepository } from '../repositories/prisma/prisma-orgs'
import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  return new RegisterUseCase(orgsRepository)
}
