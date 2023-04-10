import { z } from 'zod'

export const detailsPetParamsSchema = z.object({ petId: z.string() })
