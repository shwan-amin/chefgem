import type { Request, Response } from 'express'

export async function generateRecipesHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Validate ingredients, call Gemini service, persist generated recipes.
  res.status(501).json({ message: 'generate recipes not implemented yet' })
}

export async function saveRecipeHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Persist saved recipe for authenticated user.
  res.status(501).json({ message: 'save recipe not implemented yet' })
}

export async function listSavedRecipesHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Return recipes saved by authenticated user.
  res.status(501).json({ message: 'list saved recipes not implemented yet' })
}

export async function getRecipeByIdHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Return one recipe with ownership check.
  res.status(501).json({ message: 'get recipe not implemented yet' })
}
