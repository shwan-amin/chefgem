export type ApiErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | (string & {})

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode
    message: string
    status: number
    requestId?: string
    details?: unknown
  }
}

export class AppError extends Error {
  public readonly status: number
  public readonly code: ApiErrorCode
  public readonly details?: unknown

  constructor(opts: { status: number; code: ApiErrorCode; message: string; details?: unknown }) {
    super(opts.message)
    this.status = opts.status
    this.code = opts.code
    this.details = opts.details
  }
}

export const errors = {
  badRequest: (code: ApiErrorCode, message: string, details?: unknown) =>
    new AppError({ status: 400, code, message, details }),
  unauthorized: (code: ApiErrorCode, message = 'Unauthorized') =>
    new AppError({ status: 401, code, message }),
  forbidden: (code: ApiErrorCode, message = 'Forbidden') => new AppError({ status: 403, code, message }),
  notFound: (code: ApiErrorCode, message = 'Not found') => new AppError({ status: 404, code, message }),
  conflict: (code: ApiErrorCode, message: string) => new AppError({ status: 409, code, message }),
}
