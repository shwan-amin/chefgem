import { Router } from 'express'
import {
  generateRecipesHandler,
  getRecipeByIdHandler,
  listSavedRecipesHandler,
  saveRecipeHandler,
} from '../controllers/recipes.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'

export const recipesRouter = Router()

recipesRouter.post('/generate', generateRecipesHandler)
recipesRouter.post('/:recipeId/save', requireAuth, saveRecipeHandler)
recipesRouter.get('/saved', requireAuth, listSavedRecipesHandler)
recipesRouter.get('/:recipeId', requireAuth, getRecipeByIdHandler)
