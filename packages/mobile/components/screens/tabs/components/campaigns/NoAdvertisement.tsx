import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Font } from '@/theme/font.theme';
import { Colors } from '@/theme/colors.theme';
import SubmitCampaignsButton from '@/components/screens/tabs/components/campaigns/SubmitCampaignsButton';

export default function NoAdvertisement() {
	return (
		<ThemedView style={styles.container}>
			<Image source={require('@/public/images/no-image.png')} style={styles.image} />
			<ThemedView style={styles.textContainer}>
				<ThemedText style={styles.headings}>Nothing here. For now.</ThemedText>
				<ThemedText style={styles.text}>
					This is where you’ll find your finished projects.{' '}
				</ThemedText>
			</ThemedView>
			<SubmitCampaignsButton>Submit a campaign</SubmitCampaignsButton>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 32,
	},
	image: {
		width: 100,
		height: 100,
	},
	textContainer: {
		flexDirection: 'column',
		gap: 8,
		maxWidth: 229,
	},
	headings: {
		fontSize: Font.Sizes.xl,
		fontWeight: Font.Weights.extraBold,
		lineHeight: Font.Sizes.xxl,
		color: Colors.light.blackDarkest,
		textAlign: 'center',
	},
	text: {
		color: Colors.light.blackLight,
		fontSize: Font.Sizes.m,
		fontWeight: Font.Weights.regular,
		lineHeight: Font.Sizes.l,
		textAlign: 'center',
	},
});
