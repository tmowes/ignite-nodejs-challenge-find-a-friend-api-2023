import { Pet, Prisma } from '@prisma/client'
import { prisma } from '#shared/libs/prisma'
import { QueryPetsSchema } from '#shared/infra/http/controllers/pets/list/schemas'
import { convertToTitle } from '#shared/helpers/convertToTitle'

import { PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    return prisma.pet.findUnique({ where: { id } })
  }

  async findByIdWithDetails(id: string): Promise<Pet | null> {
    return prisma.pet.findUnique({ where: { id }, include: { org: true, petGallery: true } })
  }

  async listByOrgId(orgId: string): Promise<Pet[]> {
    return prisma.pet.findMany({ where: { org_id: orgId } })
  }

  async listByCity(city: string, query: QueryPetsSchema): Promise<Pet[]> {
    if (query.type && query.type === 'all') {
      // eslint-disable-next-line no-param-reassign
      delete query.type
    }

    return prisma.pet.findMany({ where: { city: convertToTitle(city), ...query } }) ?? []
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return prisma.pet.create({ data })
  }
}
