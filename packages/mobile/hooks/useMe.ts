import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/consts/query-keys.const';
import { authService } from '@/services/auth.service';

export const useMe = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.USER],
		queryFn: () => {
			return authService.me();
		},
	});
};
