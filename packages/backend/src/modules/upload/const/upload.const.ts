import * as process from 'node:process'

export const BUCKET_NAME = 'decsmm' as const
export const BUCKET_FOLDER = 'uploads' as const
export const BUCKET_URL = `${process.env.SUPABASE_URL}/storage/v1/object/public/` as const