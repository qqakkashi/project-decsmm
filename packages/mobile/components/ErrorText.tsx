import React from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TextProps } from 'react-native';
import { Font } from '@/theme/font.theme';
import { Colors } from '@/theme/colors.theme';

interface IErrorTextProps extends TextProps {
	children: React.ReactNode;
}

export default function ErrorText({ children, ...rest }: IErrorTextProps) {
	return (
		<Text {...rest} style={styles.text}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: Font.Sizes.m,
		fontWeight: Font.Weights.semiBold,
		color: Colors.light.red,
	},
});
