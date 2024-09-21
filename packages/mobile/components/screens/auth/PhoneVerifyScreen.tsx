import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import OtpInput from '@/components/screens/auth/components/OtpInput';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { Font } from '@/theme/font.theme';
import { Colors } from '@/theme/colors.theme';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterFormStore } from '@/store/register-form.store';
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';
import { usePhoneSendConfirm } from '@/hooks/usePhoneSendConfirm';
import { usePhoneConfirmCheck } from '@/hooks/usePhoneConfirmCheck';
import { useRegister } from '@/hooks/useRegister';

export default function PhoneVerifyScreenComponent() {
	const navigation = useRouter();

	const [code, setCode] = useState<string>('');

	const { registerFormData } = useRegisterFormStore();

	const { mutate: sendConfirm } = usePhoneSendConfirm();
	const {
		mutate: confirmCheck,
		isPending: isConfirmCheckPending,
		isSuccess: isConfirmCheckSuccess,
	} = usePhoneConfirmCheck();
	const { mutate: register } = useRegister();

	if (!registerFormData?.phone_number) {
		navigation.replace(Routes.Auth.Register);
		return null;
	}

	const handleSendConfirm = () => {
		sendConfirm({ phone_number: registerFormData.phone_number });
	};

	const handleConfirmCheck = () => {
		confirmCheck({ phone_number: registerFormData.phone_number, code });
	};

	const handleContinueButtonPress = () => {
		handleConfirmCheck();
	};

	useEffect(() => {
		handleSendConfirm();
	}, []);

	useEffect(() => {
		if (isConfirmCheckSuccess) {
			register({ ...registerFormData });
		}
	}, [isConfirmCheckSuccess, isConfirmCheckPending]);

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
							{`A 4-digit code was sent to ${registerFormData.phone_number}`}
						</ThemedText>
					</ThemedView>
					<OtpInput style={styles.otp} setCodeAction={setCode} />
				</ThemedView>
				<ThemedView style={styles.buttonContainer}>
					<Button
						style={styles.resendButton}
						textStyle={styles.resendButtonText}
						onPress={handleSendConfirm}
					>
						Resend code
					</Button>
					<Button
						style={styles.continueButton}
						textStyle={styles.continueButtonText}
						onPress={handleContinueButtonPress}
					>
						Continue
					</Button>
				</ThemedView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
	},
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
