import { z } from 'zod'

const ingredientSchema = z.object({
  ingredientName: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.enum(['cups', 'kgs', 'num']),
})

export const generateRecipesSchema = z.object({
  ingredients: z.array(ingredientSchema).min(1),
})
