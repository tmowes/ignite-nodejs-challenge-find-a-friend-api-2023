import { PetGallery, Prisma } from '@prisma/client'
import { prisma } from '#shared/libs/prisma'

import { PetGalleryRepository } from '../gallery.repository'

export class PrismaPetGalleryRepository implements PetGalleryRepository {
  async create(data: Prisma.PetGalleryUncheckedCreateInput): Promise<PetGallery> {
    return prisma.petGallery.create({ data })
  }
}
