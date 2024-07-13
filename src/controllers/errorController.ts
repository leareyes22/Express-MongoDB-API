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

export { globalErrorHandler }
