import type { IngredientInput } from '../../../lib/types/ingredient'

interface IngredientFormProps {
  ingredients: IngredientInput[]
  onSubmit: (ingredients: IngredientInput[]) => Promise<void>
}

export function IngredientForm(_props: IngredientFormProps) {
  // TODO: Add dynamic ingredient rows and submit behavior.
  return null
}
