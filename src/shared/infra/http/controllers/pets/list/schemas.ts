import { z } from 'zod'

export const listCityPetsParamsSchema = z.object({ city: z.string() })

export type PetAgeProps = 'cub' | 'adolescent' | 'elderly'

export type PetIndependenceProps = 'low' | 'medium' | 'high'

export type PetSizeProps = 'small' | 'medium' | 'big'

export type PetTypeProps = 'dog' | 'cat'

export type QueryPetsProps = {
  age?: PetAgeProps
  energy?: number
  independence?: PetIndependenceProps
  size?: PetSizeProps
  type?: PetTypeProps | 'all'
}

export const listCityPetsQuerySchema = z.object({
  age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
  energy: z.coerce.number().min(1).max(5).optional(),
  independence: z.enum(['low', 'medium', 'high']).optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  type: z.enum(['dog', 'cat', 'all']).optional(),
})

export type QueryPetsSchema = z.infer<typeof listCityPetsQuerySchema>
