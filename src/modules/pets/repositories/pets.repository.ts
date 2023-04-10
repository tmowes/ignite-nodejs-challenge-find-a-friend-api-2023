import { QueryPetsSchema } from '#shared/infra/http/controllers/pets/list/schemas'
import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByIdWithDetails(id: string): Promise<Pet | null>
  listByOrgId(orgId: string): Promise<Pet[]>
  listByCity(city: string, query: QueryPetsSchema): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
