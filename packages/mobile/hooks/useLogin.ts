import { useMutation } from '@tanstack/react-query';
import { LoginPayload } from '@/types/auth.service.types';
import { authService } from '@/services/auth.service';
import { QUERY_KEYS } from '@/consts/query-keys.const';
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export const useLogin = () => {
	const navigation = useRouter();
	return useMutation({
		mutationKey: [QUERY_KEYS.USER],
		mutationFn: async (payload: LoginPayload) => {
			return authService.login(payload);
		},
		onSuccess: async () => {
			navigation.push(Routes.Tabs);
		},
	});
};
