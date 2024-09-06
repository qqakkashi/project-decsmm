import {
  CookieOptions
} from 'express'

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge:   14 * 24 * 60 * 60 * 1000,
  secure:   process.env.NODE_ENV !== 'dev',
  path:     '/',
  sameSite: 'none',
} as const
