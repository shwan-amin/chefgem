import type { NextFunction, Request, Response } from 'express'

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  // TODO: Verify JWT and attach user payload to request context.
  req
  next()
}
