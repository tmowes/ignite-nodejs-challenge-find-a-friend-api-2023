import { Prisma } from '@prisma/client'
import { prisma } from '#shared/libs/prisma'

import { OrgsRepository } from '../orgs.repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    return prisma.org.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return prisma.org.findUnique({ where: { email } })
  }

  async create(data: Prisma.OrgCreateInput) {
    return prisma.org.create({ data })
  }
}
