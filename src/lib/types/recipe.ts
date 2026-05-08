import type { IngredientInput } from './ingredient'

export interface RecipeCardViewModel {
  id: string
  title: string
  prepMinutes: number
  cookMinutes: number
  servings: number
  imageUrl: string
}

export interface RecipeDetail extends RecipeCardViewModel {
  ingredients: IngredientInput[]
  steps: string[]
}
