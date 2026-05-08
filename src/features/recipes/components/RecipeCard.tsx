import type { RecipeCardViewModel } from '../../../lib/types/recipe'

interface RecipeCardProps {
  recipe: RecipeCardViewModel
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export function RecipeCard(_props: RecipeCardProps) {
  // TODO: Render recipe summary and drag/swipe interactions.
  return null
}
