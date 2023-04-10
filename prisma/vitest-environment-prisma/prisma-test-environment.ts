/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    // const schema = 'dev'
    const databaseURL = `file:./${schema}.db`

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "pet_gallery"`)
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "pets"`)
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "orgs"`)
        await prisma.$disconnect()
        console.log('Deleting database...')
      },
    }
  },
}
