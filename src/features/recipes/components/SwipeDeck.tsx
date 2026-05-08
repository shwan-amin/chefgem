import type { RecipeCardViewModel } from '../../../lib/types/recipe'

interface SwipeDeckProps {
  recipes: RecipeCardViewModel[]
  onSaveRecipe: (recipeId: string) => Promise<void>
}

export function SwipeDeck(_props: SwipeDeckProps) {
  // TODO: Manage current card index and swipe result states.
  return null
}
