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

@Controller('phone')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send-confirm')
  public async confirmPhoneRequest(
    @Body() body: VerifyPhoneDto,
  ): Promise<string> {
    const {
      phone_number
    } = body
    return this.twilioService.sendVerificationMessage(phone_number)
  }

  @Post('confirm-check')
  public async checkConfirmPhoneByCode(
    @Body() body: CheckVerifyPhoneDto,
  ): Promise<boolean> {
    const {
      phone_number, code
    } = body
    return this.twilioService.verifyCode({
      phone_number,
      code,
    })
  }
}
