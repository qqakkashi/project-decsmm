export const ERROR_MESSAGES = {
  UNAUTHORIZED:    'User unauthorized',
  PASSWORD_MATCH:  'Passwords must matches',
  NAME_EXIST:      'User with this name exists',
  EMAIL_EXIST:     'User with this email exists',
  PHONE_EXIST:     'User with this phone number exists',
  USER_NOT_FOUND:  'User not found',
  PASSWORD_WRONG:  'Password wrong',
  PHONE_WRONG:     'Phone number wrong',
  BLOGGER_ONLY:    'This resource available for blogger only',
  ADVERTISER_ONLY: 'This resource available for advertiser only',
  FILE_TYPE_ERROR: 'Invalid file type, only JPG, JPEG, PNG, PDF, and DOCX are allowed!',
  UPLOAD_FILE:     'Error while uploading file'
} as const
