import { Org } from '@prisma/client'

export type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
  address: string
  zip: string
  whatsapp: string
}

export type RegisterUseCaseResponse = {
  org: Org
}
