import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { SafeAreaView } from 'react-native-safe-area-context';
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
			navigationContainerRef.navigate(Routes.Auth.Login as never);
		}
	}, [user, isError, isPending, navigationContainerRef]);

	if (isPending) {
		return (
			<SafeAreaView style={styles.container}>
				<Loader />
			</SafeAreaView>
		);
	}

	return children;
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
	},
});
