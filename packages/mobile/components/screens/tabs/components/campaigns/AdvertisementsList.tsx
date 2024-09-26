import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Advertisement } from '@/types/advertisement.service.types';
import AdvertisementItem from '@/components/screens/tabs/components/campaigns/AdvertisementItem';
import NoAdvertisement from '@/components/screens/tabs/components/campaigns/NoAdvertisement';
import SubmitCampaignsButton from '@/components/screens/tabs/components/campaigns/SubmitCampaignsButton';
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';

interface ICampaignsListProps {
	advertisements: Array<Advertisement>;
}

export default function AdvertisementsList({ advertisements }: ICampaignsListProps) {
	const router = useRouter();

	const handleAddButtonPress = () => {
		router.push(Routes.Campaigns.Create);
	};
	return (
		<ScrollView contentContainerStyle={styles.scrollableContent}>
			{!advertisements.length ? (
				<NoAdvertisement />
			) : (
				<>
					{advertisements.map((advertisement, index) => (
						<React.Fragment key={index}>
							<AdvertisementItem advertisement={advertisement} key={index} />
						</React.Fragment>
					))}
				</>
			)}
			<SubmitCampaignsButton onPress={handleAddButtonPress}>Add +</SubmitCampaignsButton>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollableContent: {
		padding: 20,
		width: Dimensions.get('window').width * 0.85,
		flex: 1,
		alignItems: 'center',
	},
});
