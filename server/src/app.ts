import cors from 'cors'
import express from 'express'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import { apiRouter } from './routes/index.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true })
  })

  app.use('/api', apiRouter)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
