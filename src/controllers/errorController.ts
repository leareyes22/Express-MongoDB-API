import AppError from '../utils/appError'

const globalErrorHandler = (
  err: AppError,
  _req: any,
  res: any,
  _next: any,
): any => {
  console.log(err.stack)

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please login again!', 401)

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please login again!', 401)

export { globalErrorHandler, handleJWTError, handleJWTExpiredError }
