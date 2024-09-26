import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useSegments } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/theme/colors.theme';
import StatusNavigator from '@/components/screens/tabs/components/campaigns/StatusNavigator';
import { useGetAdvertisements } from '@/hooks/useGetAdvertisements';
import {
	AdvertisementStatusEnum,
	AdvertisementStatuses,
} from '@/consts/enum/advertisement-status.enum';
import Loader from '@/components/Loader';
import AdvertisementsList from '@/components/screens/tabs/components/campaigns/AdvertisementsList';
import { ThemedView } from '@/components/theme/ThemedView';

export default function CampaignsScreenComponent() {
	const [currentStatus, setCurrentStatus] = useState(AdvertisementStatuses[1]);
	const segments = useSegments();

	const handleButtonClick = (status: AdvertisementStatusEnum) => {
		setCurrentStatus(status);
	};
	const { data: advertisements, isLoading: isAdvertisementsLoading } = useGetAdvertisements({
		status: currentStatus as AdvertisementStatusEnum,
		page: 1,
		pageSize: 10,
	});
	return (
		<ThemedView style={styles.container}>
			<Header label={segments[segments.length - 1]} />
			<StatusNavigator
				statuses={AdvertisementStatuses}
				handleButtonClick={handleButtonClick}
				currentStatus={currentStatus}
			/>
			{!isAdvertisementsLoading && !!advertisements ? (
				<AdvertisementsList advertisements={advertisements} />
			) : (
				<Loader />
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.light.background,
	},
});
