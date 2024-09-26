import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/modules/providers/AuthProvider';
import { queryClientConfig } from '@/modules/configs/query-client.config';
import 'react-native-reanimated';

import { useColorScheme } from 'react-native';
import { Routes } from '@/consts/routes.const';
import SafeAreaViewProvider from '@/modules/providers/SafeAreaViewProvider';

SplashScreen.hideAsync();

export default function RootLayout() {
	const queryClient = new QueryClient(queryClientConfig);
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaViewProvider>
					<AuthProvider>
						<Stack initialRouteName="(tabs)/explore">
							<Stack.Screen
								name={Routes.makeRouteName(Routes.Tabs.Explore, 0)}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name={Routes.makeRouteName(Routes.Auth.Login, 0)}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name={Routes.makeRouteName(Routes.Campaigns.Create, 0)}
								options={{ headerShown: false }}
							/>
						</Stack>
					</AuthProvider>
				</SafeAreaViewProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
