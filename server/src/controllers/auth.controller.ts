import type { Request, Response } from 'express'

export async function registerHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Validate request and call auth service.
  res.status(501).json({ message: 'register not implemented yet' })
}

export async function loginHandler(_req: Request, res: Response): Promise<void> {
  // TODO: Validate request and call auth service.
  res.status(501).json({ message: 'login not implemented yet' })
}
