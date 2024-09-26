import Button, { IButtonComponentProps } from '@/components/Button';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors.theme';
import { Font } from '@/theme/font.theme';

export default function SubmitCampaignsButton(props: IButtonComponentProps) {
	const { children, textStyle, style, ...rest } = props;
	return (
		<Button style={[styles.button, style]} textStyle={[styles.buttonText, textStyle]} {...rest}>
			{children}
		</Button>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 16,
		backgroundColor: Colors.light.blueDarkest,
		borderRadius: 16,
	},
	buttonText: {
		color: Colors.light.background,
		fontSize: Font.Sizes.s,
		fontWeight: Font.Weights.semiBold,
		lineHeight: Font.Sizes.s,
	},
});
