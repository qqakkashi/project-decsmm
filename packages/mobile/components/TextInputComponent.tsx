import React, { useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	type TextInputProps,
} from 'react-native';
import { Colors } from '@/theme/colors.theme';
import Octicons from '@expo/vector-icons/Octicons';
import { ThemedView } from '@/components/theme/ThemedView';

interface TextInputComponentProps extends TextInputProps {
	onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	password?: boolean;
}

export default function TextInputComponent(props: TextInputComponentProps) {
	const { onFocus, onBlur, password, ...rest } = props;

	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);
		if (onFocus) {
			onFocus(event);
		}
	};
	const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);
		if (onBlur) {
			onBlur(event);
		}
	};

	const handlePressOnPasswordIcon = (): void => {
		setIsPasswordShown(!isPasswordShown);
	};

	return (
		<ThemedView style={styles.container}>
			<TextInput
				style={[styles.input, isFocused && styles.inputFocused]}
				placeholderTextColor={Colors.light.blackLightest}
				onFocus={handleFocus}
				onBlur={handleBlur}
				secureTextEntry={password ? !isPasswordShown : false}
				{...rest}
			/>
			{password && (
				<Octicons
					name={!isPasswordShown ? 'eye-closed' : 'eye'}
					style={styles.icon}
					onPress={handlePressOnPasswordIcon}
				/>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 48,
	},
	icon: {
		top: 16,
		right: 16,
		position: 'absolute',
		color: Colors.light.blackLightest,
		fontSize: 16,
	},
	input: {
		position: 'relative',
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 12,
		borderColor: Colors.light.greyDarkest,
		borderWidth: 1,
		borderStyle: 'solid',
		width: '100%',
		color: Colors.light.blackDarkest,
	},
	inputFocused: {
		borderColor: Colors.light.blueDarkest,
	},
});
