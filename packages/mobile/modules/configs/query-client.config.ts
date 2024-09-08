import { QueryClientConfig } from '@tanstack/react-query';

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: 3,
			retryDelay: 100,
		},
	},
};
