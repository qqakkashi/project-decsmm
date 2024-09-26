import Button from '@/components/Button';
import { Colors } from '@/theme/colors.theme';
import { capitalize } from '@/modules/utils/capitalize';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Font } from '@/theme/font.theme';
import { AdvertisementStatusEnum } from '@/consts/enum/advertisement-status.enum';

interface IStatusNavigatorProps {
	statuses: Array<AdvertisementStatusEnum>;
	handleButtonClick: (status: AdvertisementStatusEnum) => void;
	currentStatus: string;
}

export default function StatusNavigator({
	statuses,
	handleButtonClick,
	currentStatus,
}: IStatusNavigatorProps) {
	return (
		<View style={styles.navigator}>
			{statuses.map((status, index) => {
				const isButtonSelected = status.includes(currentStatus);
				return (
					<React.Fragment key={`${status}-${index}`}>
						<Button
							style={styles.navigatorButton}
							textStyle={[
								styles.navigatorButtonText,
								isButtonSelected && { color: Colors.light.blackDarkest },
							]}
							onPress={() => handleButtonClick(status)}
						>
							{capitalize(
								status === AdvertisementStatusEnum.PROGRESS
									? `In ${AdvertisementStatusEnum.PROGRESS}`
									: status
							)}
						</Button>
						{index !== statuses.length - 1 && <Text style={styles.separator}>|</Text>}
					</React.Fragment>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	navigator: {
		width: Dimensions.get('window').width * 0.9,
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 16,
		backgroundColor: Colors.light.greyLight,
		paddingVertical: 12,
	},
	navigatorButton: {
		flex: 3,
		alignItems: 'center',
	},
	navigatorButtonText: {
		color: Colors.light.blackLight,
		fontSize: Font.Sizes.s,
		fontWeight: Font.Weights.bold,
		lineHeight: Font.Sizes.m,
	},
	separator: {
		color: Colors.light.blackLight,
	},
});
