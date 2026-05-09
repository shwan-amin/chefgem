import bcrypt from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { AppError, errors } from '../lib/errors.js'
import { prisma } from "../lib/prisma.js";
import { Prisma } from '@prisma/client'
import { RegisteredUser, Token } from "../types/user.types.js"
import { env } from '../config/env.js'

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<RegisteredUser>}
 * 
 * Service that handles the registering of a user. Create DB entry and returns 
 * the userId and their email back to controller.
 */
export async function registerUser(email: string, password: string): Promise<RegisteredUser> {
  // Normalizing email
  const normalizedEmail = email.toLowerCase().trim()

  // Hash the password
  let passwordHash: string
  try {
    passwordHash = await bcrypt.hash(password, 10)
  } catch {
    // If it fails, throw error
    throw new AppError({
      status: 500,
      code: 'AUTH_PASSWORD_HASH_FAILED',
      message: 'Unable to create account at this time',
    })
  }

  // Create user entry via Prisma
  try {
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
      },
      // Select the fields that we want to return after creating user
      select: {
        id: true,
        email: true,
      },
    })
    return user
  } catch (err) {
    // If the email is already registered, throw error (first checks if prisma rejected call, then checks error code)
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw errors.conflict('AUTH_EMAIL_ALREADY_EXISTS', 'Email is already registered')
    }

    // Otherwise, throw general error
    throw new AppError({
      status: 500,
      code: 'AUTH_REGISTER_FAILED',
      message: 'Unable to create account at this time',
    })
  }
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Token>}
 * 
 * Service that handles the login-in of a user. Checks DB entry to see if user
 * exists, if valid request, return the session token.
 * 
 */
export async function loginUser(email: string, password: string): Promise<Token> {
  // Normalize email
  const normalizedEmail = email.toLowerCase().trim()

  try {
    // Find user in DB
    const user = await prisma.user.findUnique({
      where: {email: normalizedEmail}
    })

    // Check if user exists
    if (!user) {
      throw new AppError({
        status: 401,
        code: 'AUTH_LOGIN_FAILED',
        message: 'Invalid email or password was entered',
      })
    }

    // Compare passwords
    const equal = await bcrypt.compare(password, user.passwordHash)
    if (!equal) {
      throw new AppError({
        status: 401,
        code: 'AUTH_LOGIN_FAILED',
        message: 'Invalid email or password was entered',
      })
    }

    // Create the session token with JWT, and return it
    const payload = { sub: user.id }
    const token = sign(payload, env.JWT_SECRET, { expiresIn: '7d' })
    return token
  } catch (err) {
    if (err instanceof AppError) {
      throw err
    }

    throw new AppError({
      status: 500,
      code: 'AUTH_LOGIN_INTERNAL_ERROR',
      message: 'Unable to login to account at this time',
    })
  }
}
