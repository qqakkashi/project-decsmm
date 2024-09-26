import React from 'react';
import { Stack } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export default function CampaignsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name={Routes.makeRouteName(Routes.Campaigns.Create, 1)}
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
