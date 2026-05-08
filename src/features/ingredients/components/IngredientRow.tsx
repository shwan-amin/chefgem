import type { IngredientInput } from '../../../lib/types/ingredient'

interface IngredientRowProps {
  value: IngredientInput
  index: number
  onChange: (index: number, value: IngredientInput) => void
  onRemove: (index: number) => void
}

export function IngredientRow(_props: IngredientRowProps) {
  // TODO: Build a controlled row with ingredient, quantity, and unit fields.
  return null
}
