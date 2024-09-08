import axios from 'axios';
import { HttpService } from './http.service';

export class HttpFactoryService {
	createHttpService(): HttpService {
		return new HttpService(axios, process.env.EXPO_PUBLIC_BACKEND_URL ?? '');
	}
}

const httpServiceFactory = new HttpFactoryService();
const httpService = httpServiceFactory.createHttpService();
export { httpService };
