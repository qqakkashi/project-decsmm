import { IHttpClient, IHttpConfig, IMap, IResponse } from '@/types/common.types';
import { setItemAsync } from 'expo-secure-store';
import { StorageTokenEnum } from '@/enums/storage-token.enum';

export class HttpService implements IHttpClient {
	constructor(
		private fetchingService: IHttpClient,
		private baseUrl: string
	) {}

	public createQueryLink(base: string, args: IMap) {
		let url = `${base}?`;
		Object.keys(args).forEach((parameter, index) => {
			if (args[parameter]) {
				url += `${index > 0 ? '&' : ''}${parameter}=${args[parameter]}`;
			}
		});
		return url;
	}

	public async get<T>(url: string, config?: IHttpConfig) {
		return this.fetchingService
			.get<IResponse<T>>(this.getFullApiUrl(url), {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then(async (result) => {
				if (result) {
					this.checkResponseStatus(result);
					await this.setTokensToStorage(result);
					return result.data;
				}
			});
	}

	public async post<T, D>(url: string, data: D, config?: IHttpConfig): Promise<T | undefined> {
		return this.fetchingService
			.post<IResponse<T>, D>(this.getFullApiUrl(url), data, {
				...config,
				headers: {
					...this.populateContentTypeHeaderConfig(),
					...config?.headers,
				},
			})
			.then(async (result) => {
				if (result) {
					this.checkResponseStatus(result);
					await this.setTokensToStorage(result);
					return result.data;
				}
			});
	}

	public async put<T, D>(url: string, data: D, config?: IHttpConfig) {
		return this.fetchingService
			.put<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
			.then(async (result) => {
				if (result) {
					this.checkResponseStatus(result);
					await this.setTokensToStorage(result);
					return result.data;
				}
			});
	}

	public async patch<T, D>(url: string, data: D, config?: IHttpConfig) {
		return this.fetchingService
			.patch<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
			.then(async (result) => {
				if (result) {
					this.checkResponseStatus(result);
					await this.setTokensToStorage(result);
					return result.data;
				}
			});
	}

	public async delete<T>(url: string, config?: IHttpConfig) {
		return this.fetchingService
			.delete<IResponse<T>>(this.getFullApiUrl(url), config)
			.then(async (result) => {
				if (result) {
					this.checkResponseStatus(result);
					await this.setTokensToStorage(result);
					return result.data;
				}
			});
	}

	public populateContentTypeHeaderConfig() {
		return {
			'Content-Type': 'application/json',
		};
	}

	private async setTokensToStorage<T>(result: IResponse<T>) {
		await Promise.all([
			setItemAsync(StorageTokenEnum.ACCESS, result.headers!['authorization']),
			setItemAsync(StorageTokenEnum.REFRESH, result.headers!['x-refresh-token']),
		]);
	}

	private getFullApiUrl(url: string) {
		return `${this.baseUrl}/${url}`;
	}

	private checkResponseStatus<T>(result: IResponse<T>) {
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
