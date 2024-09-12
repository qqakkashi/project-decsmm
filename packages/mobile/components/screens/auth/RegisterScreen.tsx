import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/theme/colors.theme';
import { Font } from '@/theme/font.theme';
import TextInputComponent from '@/components/TextInputComponent';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';

export default function RegisterScreenComponent() {
	const navigator = useRouter();
	return (
		<SafeAreaView style={styles.container}>
			<ThemedView style={styles.headerContainer}>
				<ThemedText style={styles.headerMainText}>Register</ThemedText>
				<ThemedText style={styles.headerSubText}>
					Create an account to get started{' '}
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.formContainer}>
				<ThemedView style={styles.formInput}>
					<ThemedText style={styles.formInputLabel}>Name</ThemedText>
					<TextInputComponent placeholder={'Name'} />
				</ThemedView>
				<ThemedView style={styles.formInput}>
					<ThemedText style={styles.formInputLabel}>Email Address</ThemedText>
					<TextInputComponent placeholder={'name@email.com'} />
				</ThemedView>
				<ThemedView style={styles.formInput}>
					<ThemedText style={styles.formInputLabel}>Password</ThemedText>
					<TextInputComponent placeholder={'Create a password'} password />
				</ThemedView>
				<ThemedView style={styles.formInput}>
					<TextInputComponent placeholder={'Confirm password'} password />
				</ThemedView>
				<Button style={styles.formButton} textStyle={styles.formButtonText}>
					Register
				</Button>
			</ThemedView>
			<ThemedView style={styles.loginContainer}>
				<ThemedText style={styles.loginText}>Already registered?</ThemedText>
				<ThemedText
					style={styles.loginLinkText}
					onPress={() => navigator.navigate(Routes.Auth.Login)}
				>
					Login now
				</ThemedText>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		paddingTop: 24,
		paddingHorizontal: 24,
		backgroundColor: Colors.light.background,
		height: '100%',
	},
	headerContainer: {
		gap: 4,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	headerMainText: {
		fontSize: Font.Sizes.xxxxl,
		fontWeight: Font.Weights.extraBold,
		color: Colors.light.blackDark,
		lineHeight: Font.Sizes.xxxxl,
	},
	headerSubText: {
		fontSize: Font.Sizes.m,
		fontWeight: Font.Weights.regular,
		color: Colors.light.blackLight,
	},
	formContainer: {
		paddingVertical: 24,
		flexDirection: 'column',
	},
	formInput: {
		gap: 8,
		marginBottom: 60,
	},
	formInputLabel: {
		fontSize: Font.Sizes.m,
		fontWeight: Font.Weights.bold,
	},
	formButton: {
		backgroundColor: Colors.light.blueDarkest,
		borderColor: Colors.light.blueDarkest,
		alignItems: 'center',
		width: '100%',
		paddingVertical: 16.5,
		borderRadius: 12,
		marginTop: 16,
	},
	formButtonText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.background,
		fontWeight: Font.Weights.semiBold,
	},
	loginContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		gap: 2,
	},
	loginText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blackLight,
		fontWeight: Font.Weights.regular,
	},
	loginLinkText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blueDarkest,
		fontWeight: Font.Weights.semiBold,
	},
});
