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
import { FieldValues, useForm } from 'react-hook-form';
import KeyboardView from '@/components/KeybordView';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { RegisterPayload } from '@/types/auth.service.types';
import { UserRole } from '@/enums/user-role.enum';
import { useRegisterFormStore } from '@/store/register-form.store';
import ErrorText from '@/components/ErrorText';

export default function RegisterScreenComponent() {
	const navigator = useRouter();
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const { setRegisterFormData } = useRegisterFormStore();

	const onSubmit = (data: FieldValues) => {
		setRegisterFormData({
			...(data as Omit<RegisterPayload, 'role'>),
			role: UserRole.ADVERTISER,
		});
		navigator.push(Routes.Auth.PhoneVerify);
	};

	const rules: Record<keyof Omit<RegisterPayload, 'role'>, RegisterOptions> = {
		name: {
			required: 'Name is required',
		},
		phone_number: {
			required: 'Phone number is required',
		},
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
		password_confirm: {
			required: 'Password confirm is required',
			validate: (value) => value === getValues('password') || 'Passwords do not match',
		},
	};
	return (
		<KeyboardView scroll>
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
						<TextInputComponent
							placeholder="Name"
							name="name"
							control={control}
							rules={rules['name']}
						/>
						{errors.name && <ErrorText>{errors.name.message as string}</ErrorText>}
					</ThemedView>
					<ThemedView style={styles.formInput}>
						<ThemedText style={styles.formInputLabel}>Phone number</ThemedText>
						<TextInputComponent
							placeholder="Phone number"
							name="phone_number"
							control={control}
							rules={rules['phone_number']}
						/>
						{errors.phone_number && (
							<ErrorText>{errors.phone_number.message as string}</ErrorText>
						)}
					</ThemedView>
					<ThemedView style={styles.formInput}>
						<ThemedText style={styles.formInputLabel}>Email Address</ThemedText>
						<TextInputComponent
							placeholder={'name@email.com'}
							name={'email'}
							control={control}
							rules={rules['email']}
						/>
						{errors.email && <ErrorText>{errors.email.message as string}</ErrorText>}
					</ThemedView>
					<ThemedView style={styles.formInput}>
						<ThemedText style={styles.formInputLabel}>Password</ThemedText>
						<TextInputComponent
							placeholder={'Create a password'}
							password
							name={'password'}
							control={control}
							rules={rules['password']}
						/>
						{errors.password && (
							<ErrorText>{errors.password.message as string}</ErrorText>
						)}
					</ThemedView>
					<ThemedView style={styles.formInput}>
						<TextInputComponent
							placeholder={'Confirm password'}
							password
							name={'password_confirm'}
							control={control}
							rules={rules['password_confirm']}
						/>
						{errors.password_confirm && (
							<ErrorText>{errors.password_confirm.message as string}</ErrorText>
						)}
					</ThemedView>
					<Button
						style={styles.formButton}
						textStyle={styles.formButtonText}
						onPress={handleSubmit(onSubmit)}
					>
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
		</KeyboardView>
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
		marginBottom: 16,
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
