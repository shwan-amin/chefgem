import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError, type ApiErrorResponse } from '../lib/errors.js'

export function notFoundHandler(_req: Request, res: Response): void {
  const payload: ApiErrorResponse = {
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
      status: 404,
    },
  }
  res.status(404).json(payload)
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const requestId =
    (typeof req.headers['x-request-id'] === 'string' && req.headers['x-request-id']) || undefined

  if (error instanceof AppError) {
    const payload: ApiErrorResponse = {
      error: {
        code: error.code,
        message: error.message,
        status: error.status,
        requestId,
        details: error.details,
      },
    }
    res.status(error.status).json(payload)
    return
  }

  if (error instanceof ZodError) {
    const payload: ApiErrorResponse = {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request',
        status: 400,
        requestId,
        details: error.flatten(),
      },
    }
    res.status(400).json(payload)
    return
  }

  // Prisma (common case): unique constraint violation for register email, etc.
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const codeValue = (error as { code?: unknown }).code
    if (codeValue === 'P2002') {
      const payload: ApiErrorResponse = {
        error: {
          code: 'CONFLICT',
          message: 'Resource already exists',
          status: 409,
          requestId,
        },
      }
      res.status(409).json(payload)
      return
    }
  }

  const payload: ApiErrorResponse = {
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      status: 500,
      requestId,
    },
  }
  res.status(500).json(payload)
}
