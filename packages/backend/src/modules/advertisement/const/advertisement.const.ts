import {
  $Enums, Advertisement
} from '@prisma/client'

export const DEFAULT_TRANSITION = 0.5 as const
export const DEFAULT_TRANSITION_MAX = 10 as const
export const DEFAULT_STATUS = $Enums.AdvertisementStatus.progress

export const ADVERTISEMENT_BASE_SELECT: Record<keyof Advertisement, boolean> = {
  id:            true,
  title:         true,
  description:   true,
  status:        true,
  transition:    true,
  maxTransition: true,
  creatorId:     true,
}
