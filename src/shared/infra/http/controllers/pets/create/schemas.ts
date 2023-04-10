import { z } from 'zod'

export const createPetBodySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(255),
  energy: z.coerce.number(),
  age: z.string(),
  size: z.string(),
  independence: z.string(),
  type: z.string(),
})

export const createPetFilesSchema = z
  .array(z.object({ filename: z.string() }))
  .min(1, 'Adicione ao menos uma foto do pet')
