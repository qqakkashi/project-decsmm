import { IHttpClient, IHttpConfig, IMap, IResponse } from '@/types/common.types';

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
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
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
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	public async put<T, D>(url: string, data: D, config?: IHttpConfig) {
		return this.fetchingService
			.put<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	public async patch<T, D>(url: string, data: D, config?: IHttpConfig) {
		return this.fetchingService
			.patch<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	public async delete<T>(url: string, config?: IHttpConfig) {
		return this.fetchingService
			.delete<IResponse<T>>(this.getFullApiUrl(url), config)
			.then((result) => {
				if (result) {
					this.checkResponseStatus(result);
					return result.data;
				}
			});
	}

	public populateContentTypeHeaderConfig() {
		return {
			'Content-Type': 'application/json',
		};
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
