import { Tabs } from 'expo-router';
import React from 'react';
import Tab from '@/components/Tab';
import { Routes } from '@/consts/routes.const';

export default function TabLayout() {
	return (
		<Tabs tabBar={(props) => <Tab {...props} />}>
			<Tabs.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Tabs.Explore)}
				options={{ title: 'Explore', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Tabs.Campaigns)}
				options={{ title: 'Campaigns', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Tabs.Analytics)}
				options={{ title: 'Analytics', headerShown: false }}
			/>
			<Tabs.Screen
				name={Routes.makeRouteNameForStackFromEndRoute(Routes.Tabs.Profile)}
				options={{ title: 'Profile', headerShown: false }}
			/>
		</Tabs>
	);
}
