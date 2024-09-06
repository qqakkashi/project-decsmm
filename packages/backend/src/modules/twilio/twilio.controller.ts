import {
  Body, Controller, Post
} from '@nestjs/common'
import {
  TwilioService
} from './twilio.service'
import {
  CheckVerifyPhoneDto
} from './dto/check-verify-phone.dto'
import {
  VerifyPhoneDto
} from './dto/verify-phone.dto'
import {
  API_ROUTES
} from '../common/consts/routes.const'

@Controller(API_ROUTES.PHONE.CONTROLLER)
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post(API_ROUTES.PHONE.SEND_CONFIRM)
  public async confirmPhoneRequest(
    @Body() body: VerifyPhoneDto,
  ): Promise<string> {
    const {
      phone
    } = body
    return this.twilioService.sendVerificationMessage(phone)
  }

  @Post(API_ROUTES.PHONE.CONFIRM_CHECK)
  public async checkConfirmPhoneByCode(
    @Body() body: CheckVerifyPhoneDto,
  ): Promise<boolean> {
    const {
      phone, code
    } = body
    return this.twilioService.verifyCode({
      phone, code
    })
  }
}
