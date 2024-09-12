import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/modules/providers/AuthProvider';
import { queryClientConfig } from '@/modules/configs/query-client.config';
import 'react-native-reanimated';

import { useColorScheme } from 'react-native';
import { Routes } from '@/consts/routes.const';

SplashScreen.hideAsync();

export default function RootLayout() {
	const queryClient = new QueryClient(queryClientConfig);
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Stack>
						<Stack.Screen name={Routes.Tabs} options={{ headerShown: false }} />
						<Stack.Screen
							name={Routes.Auth.Login}
							options={{ headerShown: false, gestureEnabled: false }}
						/>
						<Stack.Screen
							name={Routes.Auth.Register}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name={Routes.Auth.PhoneVerify}
							options={{ headerShown: false }}
						/>
					</Stack>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
