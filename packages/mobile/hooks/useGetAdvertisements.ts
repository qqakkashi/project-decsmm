import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/consts/query-keys.const';
import { advertisementService } from '@/services/advertisement.service';
import { Advertisement, GetAdvertisementsPayload } from '@/types/advertisement.service.types';

export const useGetAdvertisements = (payload: GetAdvertisementsPayload) => {
	return useQuery<Array<Advertisement>>({
		queryKey: [QUERY_KEYS.ADVERTISEMENT, payload],
		queryFn: async ({ queryKey }) => {
			const [_, payload] = queryKey;
			return advertisementService.getAdvertisements(payload as GetAdvertisementsPayload);
		},
	});
};
