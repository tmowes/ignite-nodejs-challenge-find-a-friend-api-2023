import { Prisma, PetGallery } from '@prisma/client'

export interface PetGalleryRepository {
  create(data: Prisma.PetGalleryUncheckedCreateInput): Promise<PetGallery>
}
