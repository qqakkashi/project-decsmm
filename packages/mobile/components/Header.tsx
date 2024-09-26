import { StyleSheet } from 'react-native';
import { capitalize } from '@/modules/utils/capitalize';
import React from 'react';
import { Colors } from '@/theme/colors.theme';
import { Font } from '@/theme/font.theme';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';

interface IHeaderProps {
	style?: StyleProp<ViewStyle>;
	label: string;
}

export default function Header({ label, style }: IHeaderProps) {
	return (
		<ThemedView style={[styles.container, style]}>
			<ThemedText style={styles.headerText}>{capitalize(label)}</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 20,
		// flex: 1,
	},
	headerText: {
		fontWeight: Font.Weights.bold,
		fontSize: Font.Sizes.l,
		lineHeight: Font.Sizes.l,
	},
});
