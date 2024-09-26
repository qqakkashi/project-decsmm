import { AdvertisementStatusEnum } from '@/consts/enum/advertisement-status.enum';

export type GetAdvertisementsPayload = {
	status?: AdvertisementStatusEnum;
	page?: number;
	pageSize?: number;
};

export type Advertisement = {
	id: string;
	title: string;
	description: string;
	status: AdvertisementStatusEnum;
	transition: number;
	maxTransition: number;
	advertisementFiles: AdvertisementFile;
	creatorId: string;
};

export type AdvertisementFile = {
	url: string;
};
