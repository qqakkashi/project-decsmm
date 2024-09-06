import {
  UserWithoutPassword
} from '../types/user.types'

export const USER_BASE_SELECT: Record<keyof UserWithoutPassword, boolean> = {
  id:           true,
  name:         true,
  email:        true,
  phone_number: true,
  role:         true,
} as const
