import { Redirect } from 'expo-router';
import React from 'react';
import { Routes } from '@/consts/routes.const';

const IndexScreen = () => {
	return <Redirect href={Routes.Tabs.Explore} />;
};

export default IndexScreen;
