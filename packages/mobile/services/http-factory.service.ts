import axios from 'axios';
import { HttpService } from './http.service';
import { EnhancedWithAuthHttpService } from '@/services/http-auth.service';

export class HttpFactoryService {
	createHttpService(): HttpService {
		return new HttpService(axios, process.env.EXPO_PUBLIC_BACKEND_URL ?? '');
	}

	createAuthHttpService() {
		return new EnhancedWithAuthHttpService(this.createHttpService());
	}
}

const httpServiceFactory = new HttpFactoryService();
const httpService = httpServiceFactory.createHttpService();
export { httpService };
