import { HttpFactoryService } from '@/services/http-factory.service';
import { LoginPayload, RegisterPayload, TokenResponse } from '@/types/auth.service.types';
import { EnhancedWithAuthHttpService } from '@/services/http-auth.service';

class AuthService {
	constructor(private httpService: EnhancedWithAuthHttpService) {}

	public async me() {
		return this.httpService.get('auth/me');
	}

	public async login(payload: LoginPayload) {
		return this.httpService.post<TokenResponse, LoginPayload>('auth/login', payload);
	}

	public async register(payload: RegisterPayload) {
		return this.httpService.post<TokenResponse, RegisterPayload>('auth/register', payload);
	}
}
const factory = new HttpFactoryService();
export const authService = new AuthService(factory.createAuthHttpService());
