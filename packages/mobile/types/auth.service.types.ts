import { UserRole } from '@/enums/user-role.enum';

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	name: string;
	email: string;
	phone_number: string;
	password: string;
	password_confirm: string;
	role: UserRole;
};

export type TokenResponse = {
	accessToken: string;
	refreshToken: string;
};
