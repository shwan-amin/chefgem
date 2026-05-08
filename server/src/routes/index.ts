import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import { recipesRouter } from './recipes.routes.js'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/recipes', recipesRouter)
