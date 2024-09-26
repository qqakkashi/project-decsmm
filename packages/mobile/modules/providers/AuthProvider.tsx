import React, { useEffect } from 'react';
import { useMe } from '@/hooks/useMe';
import { useNavigationContainerRef } from 'expo-router';
import { Routes } from '@/consts/routes.const';
import Loader from '@/components/Loader';

interface IAuthProviderProps {
	children?: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
	const { data: user, isError, isPending } = useMe();
	const navigationContainerRef = useNavigationContainerRef();
	useEffect(() => {
		if (navigationContainerRef.isReady() && (isError || !user)) {
			navigationContainerRef.navigate(Routes.makeRouteName(Routes.Auth.Login, 0) as never);
		}
	}, [user, isError, isPending, navigationContainerRef]);

	if (isPending) {
		return <Loader />;
	}

	return children;
}
