import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { QueryPetsSchema } from '#shared/infra/http/controllers/pets/list/schemas'
import { filterByQueries } from '#shared/helpers/filterByQueries'
import { convertToTitle } from '#shared/helpers/convertToTitle'

import { PetsRepository } from '../pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findByIdWithDetails(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async listByOrgId(orgId: string): Promise<Pet[]> {
    return this.items.filter((item) => item.org_id === orgId)
  }

  async listByCity(city: string, query: QueryPetsSchema): Promise<Pet[]> {
    return filterByQueries(
      this.items.filter((item) => item.city === city),
      query,
    )
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      org_id: data.org_id,
      age: data.age,
      city: convertToTitle(data.city),
      energy: data.energy,
      independence: data.independence,
      size: data.size,
      photo: data.photo,
      type: data.type,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
