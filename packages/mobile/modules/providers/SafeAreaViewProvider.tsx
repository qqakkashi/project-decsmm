import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/theme/ThemedView';
import React from 'react';
import { useSegments } from 'expo-router';
import { StyleSheet } from 'react-native';
import { NO_PADDING_ROUTES } from '@/consts/no-padding-routes.const';

interface ISafeAreaViewProps {
	children: ReactNode;
}

export default function SafeAreaViewProvider({ children }: ISafeAreaViewProps) {
	const insets = useSafeAreaInsets();
	const segments = useSegments();

	const paddingStyles = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const paddings = NO_PADDING_ROUTES.includes(segments.join('/')) ? {} : paddingStyles;
	return <ThemedView style={[styles.container, paddings]}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
