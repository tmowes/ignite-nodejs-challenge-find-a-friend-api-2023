import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from '#shared/errors/organization-already-exists'
import { OrgsRepository } from '#modules/orgs/repositories/orgs.repository'

import { RegisterUseCaseRequest, RegisterUseCaseResponse } from './types'

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(request: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const { name, email, address, whatsapp, zip, password } = request
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({ name, email, address, whatsapp, zip, password_hash })

    return { org }
  }
}
