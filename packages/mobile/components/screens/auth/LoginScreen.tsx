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
import { useRouter } from 'expo-router';
import { Routes } from '@/consts/routes.const';
import KeyboardView from '@/components/KeybordView';
import { FieldValues, useForm } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { LoginPayload } from '@/types/auth.service.types';
import { useLogin } from '@/hooks/useLogin';
import ErrorText from '@/components/ErrorText';

export default function LoginScreenComponent() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const { mutate: login } = useLogin();

	const onSubmit = (data: FieldValues) => {
		login({ ...(data as LoginPayload) });
	};

	const rules: Record<keyof LoginPayload, RegisterOptions> = {
		email: {
			required: 'Email is required',
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Invalid email format',
			},
		},
		password: {
			required: 'Password is required',
			pattern: {
				value: /^[a-zA-Z0-9_-]+$/,
				message:
					'Password must not consist this characters: ! @ # $ % ^ & * ( ) = + [ ] { } | \\ : ; " \' < > , . ? / ~ ` ',
			},
			minLength: {
				value: 8,
				message: 'Password must be at least 8 characters',
			},
		},
	};

	const navigator = useRouter();
	return (
		<KeyboardView>
			<ParallaxScrollView
				headerBackgroundColor={{
					light: Colors.light.blueLightest,
					dark: Colors.dark.blueDark,
				}}
				headerImage={<AntDesign name="adduser" style={styles.headerImage} />}
			>
				<ThemedView style={styles.container}>
					<ThemedText style={styles.headerText}>Welcome!</ThemedText>
					<ThemedView style={styles.inputContainer}>
						<TextInputComponent
							placeholder={'Email Address'}
							control={control}
							name={'email'}
							rules={rules['email']}
						/>
						{errors.email && <ErrorText>{errors.email.message as string}</ErrorText>}
						<TextInputComponent
							placeholder={'Password'}
							password
							control={control}
							name={'password'}
							rules={rules['password']}
						/>
						{errors.password && (
							<ErrorText>{errors.password.message as string}</ErrorText>
						)}
						<ThemedText style={styles.inputForgotPassword}>Forgot password?</ThemedText>
					</ThemedView>
					<Button
						style={styles.loginButton}
						textStyle={styles.loginButtonText}
						onPress={handleSubmit(onSubmit)}
					>
						Login
					</Button>
					<ThemedView style={styles.registerContainer}>
						<ThemedText style={styles.registerText}>Not a member?</ThemedText>
						<ThemedText
							style={styles.registerLinkText}
							onPress={() => navigator.navigate(Routes.Auth.Register)}
						>
							Register now
						</ThemedText>
					</ThemedView>
				</ThemedView>
			</ParallaxScrollView>
		</KeyboardView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		position: 'absolute',
		bottom: -50,
		left: 100,
		color: Colors.light.blueDarkest,
		fontSize: 300,
	},
	container: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 24,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: Font.Sizes.xxxxl,
		fontWeight: Font.Weights.black,
		lineHeight: Font.Sizes.xxxxl,
	},
	inputContainer: {
		gap: 16,
		paddingVertical: 24,
	},
	inputForgotPassword: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blueDarkest,
		fontWeight: Font.Weights.semiBold,
	},
	loginButton: {
		backgroundColor: Colors.light.blueDarkest,
		borderColor: Colors.light.blueDarkest,
		alignItems: 'center',
		width: '100%',
		paddingVertical: 16.5,
		borderRadius: 12,
		marginBottom: 16,
	},
	loginButtonText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.background,
		fontWeight: Font.Weights.semiBold,
	},
	registerContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		gap: 2,
	},
	registerText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blackLight,
		fontWeight: Font.Weights.regular,
	},
	registerLinkText: {
		fontSize: Font.Sizes.m,
		color: Colors.light.blueDarkest,
		fontWeight: Font.Weights.semiBold,
	},
});
