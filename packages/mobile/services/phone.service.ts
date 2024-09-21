import { ConfirmCheckPayload, SendConfirmationPayload } from '@/types/phone.service.types';
import axios, { Axios, AxiosResponse } from 'axios';

class PhoneService {
	constructor(
		private fetchingService: Axios,
		private baseUrl: string
	) {}

	public async sendConfirmation(payload: SendConfirmationPayload) {
		return this.fetchingService
			.post(this.getFullApiUrl('phone/send-confirm'), payload)
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	public async confirmCheck(payload: ConfirmCheckPayload) {
		return this.fetchingService
			.post(this.getFullApiUrl('phone/confirm-check'), payload)
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	private getFullApiUrl(url: string) {
		return `${this.baseUrl}/${url}`;
	}

	private checkResponseStatus(result: AxiosResponse<any, any>) {
		if (result.status >= 400 && result.status < 600) {
			const errorData = {
				response: {
					status: result.status,
					data: result.data,
				},
			};

			throw new Error(JSON.stringify(errorData));
		}
	}
}
export const phoneService = new PhoneService(axios, process.env.EXPO_PUBLIC_BACKEND_URL ?? '');
