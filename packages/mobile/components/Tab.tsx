import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/theme/colors.theme';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { Font } from '@/theme/font.theme';

const icons: Record<string, ImageSourcePropType> = {
	['explore']: require('@/public/images/explore.png'),
	['explore-active']: require('@/public/images/explore-active.png'),
	['campaigns']: require('@/public/images/campaigns.png'),
	['campaigns-active']: require('@/public/images/campaigns-active.png'),
	['analytics']: require('@/public/images/analytics.png'),
	['analytics-active']: require('@/public/images/analytics-active.png'),
	['profile']: require('@/public/images/profile.png'),
	['profile-active']: require('@/public/images/profile-active.png'),
};

export default function Tab({ state, descriptors, navigation }: BottomTabBarProps) {
	return (
		<ThemedView style={styles.container}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;
				const icon = isFocused
					? `${(label as string).toLowerCase()}-active`
					: (label as string).toLowerCase();

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.content}
					>
						<Image source={icons[icon]} style={styles.icon} />
						<ThemedText
							style={[
								styles.text,
								isFocused && { fontWeight: Font.Weights.semiBold },
							]}
						>
							{label as string}
						</ThemedText>
					</TouchableOpacity>
				);
			})}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '80%',
		backgroundColor: Colors.light.background,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		bottom: 16,
		padding: 16,
		borderRadius: 24,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		gap: 6,
		alignSelf: 'center',
	},
	icon: {
		width: 20,
		height: 20,
	},
	text: {
		fontSize: Font.Sizes.s,
		lineHeight: Font.Sizes.s,
	},
});
