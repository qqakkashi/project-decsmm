import {
  NestFactory
} from '@nestjs/core'
import {
  AppModule
} from './app.module'
import {
  ValidationPipe
} from '@nestjs/common'

import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import {
  COOKIE_OPTIONS
} from './modules/common/consts/cookie.const'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 4000

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.enableCors({
    credentials: true,
    origin:      [process.env.FRONTEND_URL],
  })

  app.use(cookieParser())

  app.use(
    session({
      cookie:            COOKIE_OPTIONS,
      secret:            process.env.SECRET_COOKIE,
      resave:            false,
      saveUninitialized: false,
    }),
  )
  await app.listen(port)

  console.log(`App started on port ${port}`)
}

bootstrap()
