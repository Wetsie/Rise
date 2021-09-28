import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CustomText from "_components/atoms/CustomText";
import ChooseIndicator from "_components/atoms/modes/ChooseIndicator";
import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import RootContext from "_components/context/RootContext";
import { WHITE } from "_styles/colors";
import { CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import { setRingtone } from "_utils/mmkv/MmkvSetFunctions";
import { useStateSafe } from "_utils/useStateSafe";

const RingtoneChoose = (): JSX.Element => {
	const { arrayToMap } = useContext(CreateModeSettingsContext);
	const { napRingtone } = useContext(RootContext);
	const [activeRingtone, setActiveRingtone] = useStateSafe(napRingtone.value);

	const onPress = (item: string) => {
		setActiveRingtone(item);
		napRingtone.value = item;
		setRingtone(item);
	};

	return (
		<View style={styles.mainContainer}>
			{
				arrayToMap.map((item, key) => {
					return (
						<Pressable
							onPress={() => onPress(item as string)}
							style={styles.elementItem}
							key={key}
						>
							<CustomText style={styles.text}>{item}</CustomText>
							{activeRingtone === item ? <ChooseIndicator /> : null}
						</Pressable>
					);
				})
			}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: WHITE,
	},

	elementItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: (CONTENT_PADDING * 1.5) / 2,
		paddingHorizontal: CONTENT_PADDING * 2,
	},
    
	text: {
		fontSize: FONT_SIZE_20,
	},
});

export default RingtoneChoose;
