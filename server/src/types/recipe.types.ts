export type IngredientUnit = 'cups' | 'kgs' | 'num'

export interface IngredientInput {
  ingredientName: string
  quantity: number
  unit: IngredientUnit
}

export interface GeneratedRecipe {
  title: string
  prepMinutes: number
  cookMinutes: number
  servings: number
  ingredients: string[]
  steps: string[]
  imageQuery: string
}
