import type { GeneratedRecipe } from '../types/recipe.types.js'

export function normalizeGeminiRecipes(payload: unknown): GeneratedRecipe[] {
  // TODO: Validate/normalize Gemini output into strict GeneratedRecipe[].
  void payload
  return []
}
