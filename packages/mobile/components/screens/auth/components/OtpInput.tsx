import React, { useRef, useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputKeyPressEventData,
	ViewStyle,
} from 'react-native';
import { Colors } from '@/theme/colors.theme';
import { ThemedView } from '@/components/theme/ThemedView';

interface IOtpInputProps {
	length?: number;
	style?: ViewStyle;
}

export default function OtpInput({ length = 4, style }: IOtpInputProps) {
	const [code, setCode] = useState<string[]>(Array(length).fill(''));
	const [focusedInputIndex, setFocusedInputIndex] = useState<number>(0);
	const inputs = useRef<(TextInput | null)[]>([]);

	const handleChange = (text: string, index: number) => {
		if (text.length > 1) return;

		const newCode = [...code];
		newCode[index] = text;

		if (text) {
			if (index < length - 1) {
				inputs.current[index + 1]?.focus();
			}
		} else {
			moveFocusOnDelete(index);
		}

		setCode(newCode);
	};

	const moveFocusOnDelete = (index: number) => {
		for (let i = index + 1; i < length; i++) {
			if (code[i]) {
				inputs.current[i]!.focus();
				return;
			}
		}

		for (let i = index - 1; i >= 0; i--) {
			if (code[i]) {
				inputs.current[i]!.focus();
				return;
			}
		}
	};

	const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		const key = e.nativeEvent.key;
		const index = inputs.current.findIndex((input) => input?.isFocused());

		switch (true) {
			case /^[0-9]$/.test(key) && !!code[index] && index !== 3:
				inputs.current[index + 1]!.focus();
				handleChange(key, index + 1);
				break;
			case /^[0-9]$/.test(key):
				handleChange(key, index);
				break;
			case key === 'Backspace':
				const newValues = [...code];
				if (newValues[index] === '') {
					moveFocusOnDelete(index);
				}
				break;
		}
	};

	return (
		<ThemedView style={[styles.container, style]}>
			{Array.from({ length }).map((_, index) => (
				<TextInput
					key={index}
					ref={(el) => (inputs.current[index] = el)}
					style={[styles.input, focusedInputIndex === index && styles.inputFocus]}
					maxLength={1}
					keyboardType="number-pad"
					onChangeText={(text) => handleChange(text, index)}
					onKeyPress={handleKeyPress}
					onFocus={() => setFocusedInputIndex(index)}
					underlineColorAndroid="transparent"
					returnKeyType={index === length - 1 && code[length - 1] ? 'done' : 'next'}
					autoFocus={index === 0}
					value={code[index]}
				/>
			))}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		maxWidth: 216,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
		gap: 8,
	},
	input: {
		width: 48,
		height: 48,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: Colors.light.greyDarkest,
		textAlign: 'center',
		fontSize: 14,
	},
	inputFocus: {
		borderColor: Colors.light.blueDarkest,
	},
});
