export class InvalidOrganizationAccessError extends Error {
  constructor() {
    super('Organization does not have access to this resource.')
  }
}
