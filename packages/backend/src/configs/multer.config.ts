import * as multer from 'multer'

export const multerConfig = {
  storage:    multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimetypes = [
      'image/png',
      'image/jpeg',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (allowedMimetypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'), false)
    }
  },
}
