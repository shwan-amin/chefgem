import { config } from 'dotenv'
import { z } from 'zod'
import { resolve } from 'node:path'

config({ path: resolve(process.cwd(), '.env') })
config({ path: resolve(process.cwd(), '../.env') })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).default('dev-gemini-key'),
  JWT_SECRET: z.string().min(1).default('dev-jwt-secret'),
  IMAGE_API_KEY: z.string().min(1).optional(),
})

export const env = envSchema.parse(process.env)
