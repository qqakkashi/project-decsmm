/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpException, HttpStatus, Injectable
} from '@nestjs/common'
import {
  ConfigService
} from '@nestjs/config'
import {
  Twilio
} from 'twilio'
import {
  CONFIRM_MESSAGES
} from '../common/consts/confirm.const'
import {
  ERROR_MESSAGES
} from '../common/consts/error.const'
import {
  CheckVerifyPhoneDto
} from './dto/check-verify-phone.dto'

@Injectable()
export class TwilioService {
  private readonly twilioClient: Twilio

  constructor(private readonly configService: ConfigService) {
    this.twilioClient = new Twilio(
      this.configService.get('TWILIO_SID'),
      this.configService.get('TWILIO_TOKEN'),
    )
  }

  public async sendVerificationMessage(phone_number: string): Promise<string> {
    try {
      await this.twilioClient.verify.v2
        .services(this.configService.get('TWILIO_VERIFY_SID'))
        .verifications.create({
          to:      phone_number,
          channel: 'sms',
        })
      return CONFIRM_MESSAGES.SENT
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGES.PHONE_WRONG,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  public async verifyCode({
    phone_number,
    code,
  }: CheckVerifyPhoneDto): Promise<boolean> {
    try {
      const {
        valid
      } = await this.twilioClient.verify.v2
        .services(this.configService.get('TWILIO_VERIFY_SID'))
        .verificationChecks.create({
          to: phone_number,
          code,
        })
      return valid
    } catch (error) {
      return false
    }
  }
}
