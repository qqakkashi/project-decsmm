import React, { useEffect } from 'react';
import { useMe } from '@/hooks/useMe';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigationContainerRef } from 'expo-router';

interface IAuthProviderProps {
	children?: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
	const { data: user, isError, isPending } = useMe();
	const navigationContainerRef = useNavigationContainerRef();

	useEffect(() => {
		if (navigationContainerRef.isReady() && (isError || !user)) {
			navigationContainerRef.navigate('auth' as never);
		}
	}, [user, isError, isPending, navigationContainerRef]);

	if (isPending) {
		return (
			<SafeAreaView>
				<Text>loading...</Text>
			</SafeAreaView>
		);
	}

	return <>{children}</>;
};

export default AuthProvider;
