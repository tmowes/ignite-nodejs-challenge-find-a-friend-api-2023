import { OrgsRepository } from '#modules/orgs/repositories/orgs.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { GetOrgProfileUseCaseRequest, GetOrgProfileUseCaseResponse } from './types'

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ orgId }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
