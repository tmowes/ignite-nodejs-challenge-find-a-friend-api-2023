import { OrgsRepository } from '#modules/orgs/repositories/orgs.repository'
import { PetGalleryRepository } from '#modules/pets/repositories/gallery.repository'
import { PetsRepository } from '#modules/pets/repositories/pets.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { convertToTitle } from '#shared/helpers/convertToTitle'
import { getGeoLocationByCEP } from '#shared/libs/location'

import { CreatePetUseCaseRequest, CreatePetUseCaseResponse } from './types'

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private galleryRepository: PetGalleryRepository,
  ) {}

  async execute(request: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const { name, description, orgId, age, energy, independence, size, type, photos } = request

    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const { city } = await getGeoLocationByCEP(org.zip)

    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      description,
      age,
      energy,
      independence,
      size,
      type,
      photo: photos[0].filename,
      city: convertToTitle(city),
    })

    await Promise.allSettled([
      photos.map(({ filename }) =>
        this.galleryRepository.create({
          photo: filename,
          pet_id: pet.id,
        }),
      ),
    ])

    return { pet }
  }
}
