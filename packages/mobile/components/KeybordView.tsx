import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';
import React from 'react';

export interface IKeyboardViewProps {
	children: React.ReactNode;
	scroll?: boolean;
}

export default function KeyboardView({ children, scroll }: IKeyboardViewProps) {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{scroll ? (
				<ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>
			) : (
				children
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
});
