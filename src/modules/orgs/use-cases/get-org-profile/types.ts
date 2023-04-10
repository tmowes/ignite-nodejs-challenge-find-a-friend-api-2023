import { Org } from '@prisma/client'

export type GetOrgProfileUseCaseRequest = {
  orgId: string
}

export type GetOrgProfileUseCaseResponse = {
  org: Org
}
