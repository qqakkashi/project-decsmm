import { IHttpClient, IHttpConfig, IMap } from '@/types/common.types';
import { HttpService } from './http.service';
import { getItemAsync } from 'expo-secure-store';
import { StorageTokenEnum } from '@/enums/storage-token.enum';

export class EnhancedWithAuthHttpService implements IHttpClient {
	constructor(private httpService: HttpService) {}

	public createQueryLink(base: string, parameters: IMap) {
		return this.httpService.createQueryLink(base, parameters);
	}

	public async get<R>(url: string, config: IHttpConfig = {}): Promise<R> {
		const conf = await this.attachAuthHeader(config);

		return (await this.httpService.get<R>(url, conf)) as Promise<R>;
	}

	public async post<R, D>(url: string, data: D, config: IHttpConfig = {}): Promise<R | void> {
		const conf = await this.attachAuthHeader(config);

		return await this.httpService.post<R, D>(url, data, conf);
	}

	public async put<R, D>(url: string, data: D, config: IHttpConfig = {}): Promise<R | void> {
		const conf = await this.attachAuthHeader(config);

		return this.httpService.put<R, D>(url, data, conf);
	}

	public async patch<R, D>(url: string, data: D, config: IHttpConfig = {}): Promise<R | void> {
		const conf = await this.attachAuthHeader(config);

		return this.httpService.patch<R, D>(url, data, conf);
	}

	public async delete<R>(url: string, config: IHttpConfig = {}): Promise<R | void> {
		const conf = await this.attachAuthHeader(config);

		return this.httpService.delete<R>(url, conf);
	}

	private async attachAuthHeader(config: IHttpConfig): Promise<IHttpConfig> {
		const accessToken = await getItemAsync(StorageTokenEnum.ACCESS);
		const refreshToken = await getItemAsync(StorageTokenEnum.REFRESH);
		return {
			...config,
			headers: {
				...config.headers,
				...this.populateTokenToHeaderConfig(accessToken as string, refreshToken as string),
			},
		};
	}

	private populateTokenToHeaderConfig(accessToken: string, refreshToken: string): object {
		return {
			['authorization']: accessToken,
			['x-refresh-token']: refreshToken,
		};
	}
}
