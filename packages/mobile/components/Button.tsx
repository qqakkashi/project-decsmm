import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';

export interface IButtonComponentProps extends TouchableOpacityProps {
	textStyle?: StyleProp<TextStyle>;
}

export default function Button(props: IButtonComponentProps) {
	const { children, textStyle, ...rest } = props;
	return (
		<TouchableOpacity {...rest}>
			<Text style={textStyle}>{children}</Text>
		</TouchableOpacity>
	);
}
