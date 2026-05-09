import { z } from 'zod'

// Validates the data coming through request body on userRegister at runTime
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Validates the data coming through request body on userLogin at runTime
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
