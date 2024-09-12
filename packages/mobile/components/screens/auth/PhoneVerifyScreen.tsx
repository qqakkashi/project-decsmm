import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React from 'react';
import OtpInput from '@/components/screens/auth/components/OtpInput';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { Font } from '@/theme/font.theme';
import { Colors } from '@/theme/colors.theme';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneVerifyScreenComponent() {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<SafeAreaView style={styles.content}>
				<ThemedView style={styles.mainContainer}>
					<ThemedView style={styles.textContainer}>
						<ThemedText style={styles.mainText}>Enter confirmation code</ThemedText>
						<ThemedText style={styles.subText}>
							A 4-digit code was sent to lucasscott3@email.com
						</ThemedText>
					</ThemedView>
					<OtpInput style={styles.otp} />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Button style={styles.resendButton} textStyle={styles.resendButtonText}>
						Resend code
					</Button>
					<Button style={styles.continueButton} textStyle={styles.continueButtonText}>
						Continue
					</Button>
				</ThemedView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.light.background,
	},
	mainContainer: {
		flex: 3,
		justifyContent: 'flex-end',
	},
	textContainer: {
		maxWidth: 230,
		display: 'flex',
		alignItems: 'center',
		gap: 8,
	},
	mainText: {
		fontWeight: Font.Weights.bold,
		fontSize: Font.Sizes.xl,
		color: Colors.light.blackDarkest,
	},
	subText: {
		fontWeight: Font.Weights.regular,
		fontSize: Font.Sizes.m,
		textAlign: 'center',
		color: Colors.light.blackLight,
	},
	otp: {
		marginVertical: 40,
	},
	buttonContainer: {
		flex: 2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		paddingHorizontal: 24,
	},
	continueButton: {
		backgroundColor: Colors.light.blueDarkest,
		borderColor: Colors.light.blueDarkest,
		alignItems: 'center',
		width: '100%',
		paddingVertical: 16.5,
		borderRadius: 12,
	},
	continueButtonText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.background,
		fontWeight: Font.Weights.semiBold,
	},
	resendButton: {
		alignItems: 'center',
		width: '100%',
		paddingVertical: 16.5,
		borderRadius: 12,
	},
	resendButtonText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blueDarkest,
		fontWeight: Font.Weights.semiBold,
	},
});
