import type { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import { env } from '../config/env.js'
import { errors } from '../lib/errors.js'

/**
 * @param {Request} req
 * @param {Response} _res
 * @returns {void}
 * 
 * Verifies requests coming from client.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  // Get the authorization header and check if it has a bearer
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw errors.unauthorized('AUTH_MISSING_BEARER_TOKEN', 'Authentication token is required')
  }

  // Extract the token out of the auth header
  const token = authHeader.slice('Bearer '.length).trim()
  if (!token) {
    throw errors.unauthorized('AUTH_INVALID_BEARER_TOKEN', 'Authentication token is invalid')
  }

  try {
    // Verify the token 
    const payload = verify(token, env.JWT_SECRET)
    const subject = typeof payload === 'object' && payload !== null ? payload.sub : undefined

    if (typeof subject !== 'string' || subject.length === 0) {
      throw errors.unauthorized('AUTH_INVALID_TOKEN_SUBJECT', 'Authentication token is invalid')
    }

    (req as Request & { userId: string }).userId = subject

    // Auth succeeded and pass control back to route handlers
    next()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw errors.unauthorized('AUTH_TOKEN_EXPIRED', 'Authentication token has expired')
    }

    if (err instanceof JsonWebTokenError) {
      throw errors.unauthorized('AUTH_INVALID_TOKEN', 'Authentication token is invalid')
    }

    throw err
  }
}
