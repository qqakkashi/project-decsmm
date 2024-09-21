import { useMutation } from '@tanstack/react-query';
import { SendConfirmationPayload } from '@/types/phone.service.types';
import { phoneService } from '@/services/phone.service';
import { QUERY_KEYS } from '@/consts/query-keys.const';

export const usePhoneSendConfirm = () => {
	return useMutation({
		mutationKey: [QUERY_KEYS.PHONE],
		mutationFn: async (payload: SendConfirmationPayload) => {
			return phoneService.sendConfirmation(payload);
		},
	});
};
