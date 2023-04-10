import { PetGallery, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetGalleryRepository } from '../gallery.repository'

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  public items: PetGallery[] = []

  async create(data: Prisma.PetGalleryUncheckedCreateInput): Promise<PetGallery> {
    const petGallery = {
      id: randomUUID(),
      photo: data.photo,
      pet_id: data.pet_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(petGallery)

    return petGallery
  }
}
