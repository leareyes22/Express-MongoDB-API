/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel'
import AppError from '../utils/appError'
import dotenv from 'dotenv'
import path from 'path'
import { ObjectId } from 'mongodb'

dotenv.config({ path: path.resolve(__dirname, '../.env', 'config.env') })

const signToken = (id: ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const newUser = await User.create(req.body)

    res.status(201).send({
      status: 'success',
      data: {
        user: newUser,
      },
    })
  } catch (err: any) {
    const error = new AppError(err.message, 400)
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body

    // 1. Check if the email and password exist.
    if (!email || !password) {
      throw new AppError('Please provide a valid email and password.', 400)
    }

    // 2. Check if the user exists and password is correct.
    const user = await User.findOne({ email }).select('+password')
    let isValid = false

    if (user) {
      isValid = await bcrypt.compare(password, user.password)
    } else {
      throw new AppError('Incorrect email or password.', 401)
    }

    if (!isValid) {
      throw new AppError('Incorrect email or password.', 401)
    }

    // 3. If everything is ok, then send token to client.
    const token = signToken(user._id)

    res.status(200).send({
      status: 'success',
      token,
    })
  } catch (err: any) {
    const error = new AppError(err.message, 401)
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  }
}

export const protect = async (
  req: any,
  _res: Response,
  next: NextFunction,
): Promise<any> => {
  // 1) Getting token and check of it's there.
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    next(
      new AppError('You are not logged in! Please login to get access.', 401),
    )
  }

  // 2) Verification token.
  const decoded: any = jwt.verify(token ?? '', process.env.JWT_SECRET ?? '')

  // 3) Check if user stil exists.
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    next(
      new AppError(
        'The user belonging to this token does not longer exist.',
        401,
      ),
    )
  }

  // 4) Check if user changed password after the token was issued.
  const hasPasswordChangedAt = currentUser?.passwordChangedAt != null
  const passwordChangedAt = hasPasswordChangedAt
    ? currentUser.passwordChangedAt
    : new Date()
  const changedTimestamp = parseInt(
    String(passwordChangedAt?.getTime() ?? 0 / 1000),
    10,
  )

  if (hasPasswordChangedAt && decoded.iat < changedTimestamp) {
    next(
      new AppError('User recently changed password! Please login again.', 401),
    )
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  next()
}

export const restrictTo = (...roles: string[]): any => {
  return (req: any, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("You don't have permission to perform this action.", 403),
      )
    }

    next()
  }
}
