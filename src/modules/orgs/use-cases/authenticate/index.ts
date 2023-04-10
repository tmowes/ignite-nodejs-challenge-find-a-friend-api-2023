import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'
import { OrgsRepository } from '#modules/orgs/repositories/orgs.repository'

import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from './types'

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, org.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
