import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/theme/ThemedView';
import { Colors } from '@/theme/colors.theme';

export default function Loader() {
	const rotation = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	React.useEffect(() => {
		rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
	}, []);

	return (
		<ThemedView style={styles.container}>
			<Animated.View style={[styles.loader, animatedStyle]} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loader: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 6,
		borderColor: Colors.light.blueDarkest,
		borderTopColor: 'transparent',
	},
});
