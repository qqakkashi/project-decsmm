import { useMutation } from '@tanstack/react-query';
import { ConfirmCheckPayload } from '@/types/phone.service.types';
import { phoneService } from '@/services/phone.service';
import { QUERY_KEYS } from '@/consts/query-keys.const';

export const usePhoneConfirmCheck = () => {
	return useMutation({
		mutationKey: [QUERY_KEYS.PHONE],
		mutationFn: async (payload: ConfirmCheckPayload) => {
			return phoneService.confirmCheck(payload);
		},
	});
};
