import { PrismaOrgsRepository } from '../repositories/prisma/prisma-orgs'
import { GetOrgProfileUseCase } from '../use-cases/get-org-profile'

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  return new GetOrgProfileUseCase(orgsRepository)
}
