import { INGREDIENT_UNITS } from '../constants/units'

export type IngredientUnit = (typeof INGREDIENT_UNITS)[number]

export interface IngredientInput {
  ingredientName: string
  quantity: number
  unit: IngredientUnit
}
