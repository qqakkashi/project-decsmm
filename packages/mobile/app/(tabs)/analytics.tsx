import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsTabScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text>Analytics</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
