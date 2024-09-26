import { Advertisement } from '@/types/advertisement.service.types';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { Font } from '@/theme/font.theme';
import { Colors } from '@/theme/colors.theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IAdvertisementItemProps {
	advertisement: Advertisement;
}

export default function AdvertisementItem({ advertisement }: IAdvertisementItemProps) {
	return (
		<TouchableOpacity style={styles.item}>
			<MaterialCommunityIcons
				name="progress-clock"
				size={36}
				color={Colors.light.greenLight}
			/>
			<ThemedView style={styles.content}>
				<ThemedText style={styles.title}>{advertisement.title}</ThemedText>
				<ThemedText style={styles.description} numberOfLines={2} ellipsizeMode="tail">
					{advertisement.description}
				</ThemedText>
			</ThemedView>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.light.greenLightest,
		marginVertical: 10,
		padding: 16,
		borderRadius: 16,
		gap: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	content: {
		flexDirection: 'column',
		gap: 4,
		backgroundColor: 'transparent',
		maxWidth: 205,
	},
	title: {
		fontSize: Font.Sizes.m,
		lineHeight: Font.Sizes.l,
		fontWeight: Font.Weights.bold,
	},
	description: {
		maxHeight: 32,
		fontSize: Font.Sizes.s,
		lineHeight: Font.Sizes.l,
		fontWeight: Font.Weights.regular,
	},
});
