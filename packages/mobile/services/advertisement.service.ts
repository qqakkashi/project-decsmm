import { EnhancedWithAuthHttpService } from '@/services/http-auth.service';
import { Advertisement, GetAdvertisementsPayload } from '@/types/advertisement.service.types';
import { HttpFactoryService } from '@/services/http-factory.service';

class AdvertisementService {
	constructor(private httpService: EnhancedWithAuthHttpService) {}

	public async getAdvertisements(payload: GetAdvertisementsPayload) {
		const url = `advertisement?status=${payload.status}&page=${payload.page}&pageSize=${payload.page}&pageSize=${payload.pageSize}`;
		return this.httpService.get<Array<Advertisement>>(url);
	}
}

const factory = new HttpFactoryService();
export const advertisementService = new AdvertisementService(factory.createAuthHttpService());
