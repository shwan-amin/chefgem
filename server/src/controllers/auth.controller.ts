import type { NextFunction, Request, Response } from 'express'
import { registerSchema, loginSchema } from '../validators/auth.validator.js'
import { email } from 'zod';
import { registerUser, loginUser } from '../services/auth.service.js'

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 * 
 * Handles a user register request from client 
 */
export async function registerHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body via zod before registration
    const parsed = registerSchema.parse(req.body)

    // Pass fields to register user service
    const user = await registerUser(parsed.email, parsed.password)

    // Send the response
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 * 
 * Handles a user login request from client
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body via zod (make it type safe)
    const parsed = loginSchema.parse(req.body);

    // Pass fields to login user service
    const token = await loginUser(parsed.email, parsed.password)

    // Send the token
    res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}
