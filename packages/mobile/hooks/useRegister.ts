import { useMutation } from '@tanstack/react-query';
import { RegisterPayload } from '@/types/auth.service.types';
import { authService } from '@/services/auth.service';
import { QUERY_KEYS } from '@/consts/query-keys.const';
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export const useRegister = () => {
	const navigation = useRouter();
	return useMutation({
		mutationKey: [QUERY_KEYS.USER],
		mutationFn: async (payload: RegisterPayload) => {
			return authService.register(payload);
		},
		onSuccess: () => {
			navigation.push(Routes.Tabs);
		},
	});
};
