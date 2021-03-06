import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CustomText from "_components/atoms/CustomText";
import ChooseIndicator from "_components/atoms/modes/ChooseIndicator";
import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import RootContext from "_components/context/RootContext";
import { WHITE } from "_styles/colors";
import { CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import { setRingtone } from "_utils/mmkv/MmkvSetFunctions";
import { loadSoundFromPhone } from "_utils/ModeSoundsListProps";
import { useStateSafe } from "_utils/useStateSafe";

const RingtoneChoose = (): JSX.Element => {
	const { arrayToMap } = useContext(CreateModeSettingsContext);
	const { napRingtone, alarmSound, volume, systemAlarmsObject } = useContext(RootContext);
	const [activeRingtone, setActiveRingtone] = useStateSafe(napRingtone.value);
	const [isRingtonePlaying, setIsRingtonePlaying] = useStateSafe(false);

	const onPress = async (item: string) => {
		if (isRingtonePlaying) {
			await alarmSound.unloadAsync();
		}
		loadSoundFromPhone({
			sound: alarmSound,
			volume: volume.value,
			uri: systemAlarmsObject[item]
		});
		setIsRingtonePlaying(true);
		setActiveRingtone(item);
		napRingtone.value = item;
		setRingtone(item);
	};

	useEffect(() => {
		return () => {
			alarmSound.unloadAsync();
		};
	}, []);

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
