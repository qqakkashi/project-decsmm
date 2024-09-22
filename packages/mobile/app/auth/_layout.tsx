import React from 'react';
import { Stack } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Auth.Login)}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Auth.Register)}
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Auth.PhoneVerify)}
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
