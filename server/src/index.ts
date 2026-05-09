import { createApp } from './app.js'
import { env } from './config/env.js'
import { authRouter } from './routes/auth.routes.js'
import { recipesRouter } from './routes/recipes.routes.js'

const app = createApp()

// AUTH ROUTER
app.use('/api/auth', authRouter)

// RECIPES ROUTER
app.use('/api/recipes', recipesRouter)

// NON-EXISTING ROUTERS
app.use((req, res) => {
  res.status(404).json({message: 'Endpoint not found'})
});

app.listen(env.PORT, () => {  
  console.log(`chefgem server listening on http://localhost:${env.PORT}`)
})
