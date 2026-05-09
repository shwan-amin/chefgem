import { z } from 'zod'

// Validates the data coming through request body on user logic at runTime
// Makes sure everything is type safe before making calls to DB/ registration/login

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
