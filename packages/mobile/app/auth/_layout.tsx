import React from 'react';
import { Stack } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name={Routes.makeRouteName(Routes.Auth.Login, 1)}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Routes.makeRouteName(Routes.Auth.Register, 1)}
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name={Routes.makeRouteName(Routes.Auth.PhoneVerify, 1)}
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
