import { HttpService } from '@/services/http.service';
import { HttpFactoryService } from '@/services/http-factory.service';

class AuthService {
	constructor(private httpService: HttpService) {}

	public async me() {
		return this.httpService.get('auth/me');
	}
}
const factory = new HttpFactoryService();
export const authService = new AuthService(factory.createHttpService());
