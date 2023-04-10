import { Org } from '@prisma/client'

export type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

export type AuthenticateUseCaseResponse = {
  org: Org
}
