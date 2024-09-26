import { Tabs } from 'expo-router';
import React from 'react';
import Tab from '@/components/Tab';
import { Routes } from '@/consts/routes.const';

export default function TabLayout() {
	return (
		<Tabs tabBar={(props) => <Tab {...props} />} initialRouteName={'explore'}>
			<Tabs.Screen
				name={Routes.makeRouteName(Routes.Tabs.Explore, 1)}
				options={{ title: 'Explore', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteName(Routes.Tabs.Campaigns, 1)}
				options={{ title: 'Campaigns', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteName(Routes.Tabs.Analytics, 1)}
				options={{ title: 'Analytics', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteName(Routes.Tabs.Profile, 1)}
				options={{ title: 'Profile', headerShown: false }}
			/>
		</Tabs>
	);
}
