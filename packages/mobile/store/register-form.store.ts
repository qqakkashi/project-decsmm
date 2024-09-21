import { create } from 'zustand';
import { RegisterPayload } from '@/types/auth.service.types';

type RegisterFormState = {
	registerFormData: RegisterPayload | null;
	setRegisterFormData: (registerFormData: RegisterPayload) => void;
};

export const useRegisterFormStore = create<RegisterFormState>((set) => ({
	registerFormData: null,
	setRegisterFormData: (data) => set({ registerFormData: data }),
}));
