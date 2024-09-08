import { StyleSheet } from 'react-native';
import React from 'react';
import TextInputComponent from '@/components/TextInputComponent';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/theme/colors.theme';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { Font } from '@/theme/font.theme';
import Button from '@/components/Button';

export default function AuthScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#EAF2FF', dark: '#2897FF' }}
			headerImage={<AntDesign name="adduser" style={styles.authHeaderImage} />}
		>
			<ThemedView style={styles.authContainer}>
				<ThemedText style={styles.authHeaderText}>Welcome!</ThemedText>
				<ThemedView style={styles.authInputContainer}>
					<TextInputComponent placeholder={'Email Address'} />
					<TextInputComponent placeholder={'Password'} password />
					<ThemedText style={styles.authInputForgotPassword}>Forgot password?</ThemedText>
				</ThemedView>
				<Button style={styles.authLoginButton} textStyle={styles.authLoginButtonText}>
					Login
				</Button>
				<ThemedView style={styles.authRegisterContainer}>
					<ThemedText style={styles.authRegisterText}>Not a member?</ThemedText>
					<ThemedText style={styles.authRegisterLinkText}>Register now</ThemedText>
				</ThemedView>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	authHeaderImage: {
		position: 'absolute',
		bottom: -50,
		left: 100,
		color: Colors.light.borderFocus,
		fontSize: 300,
	},
	authContainer: {
		paddingTop: 40,
		paddingHorizontal: 24,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	authHeaderText: {
		fontSize: Font.Sizes.xxxxl,
		fontWeight: Font.Weights.black,
		lineHeight: Font.Sizes.xxxxl,
	},
	authInputContainer: {
		gap: 16,
		paddingVertical: 24,
	},
	authInputForgotPassword: {
		fontSize: Font.Sizes.m,
		color: Colors.light.borderFocus,
		fontWeight: Font.Weights.semiBold,
	},
	authLoginButton: {
		backgroundColor: Colors.light.borderFocus,
		borderColor: Colors.light.borderFocus,
		alignItems: 'center',
		width: '100%',
		paddingVertical: 16.5,
		borderRadius: 12,
		marginBottom: 16,
	},
	authLoginButtonText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.background,
		fontWeight: Font.Weights.semiBold,
	},
	authRegisterContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		gap: 2,
	},
	authRegisterText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.icon,
		fontWeight: Font.Weights.regular,
	},
	authRegisterLinkText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.borderFocus,
		fontWeight: Font.Weights.semiBold,
	},
});
