import { z } from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string(),
  zip: z.string(),
  whatsapp: z.string(),
})
