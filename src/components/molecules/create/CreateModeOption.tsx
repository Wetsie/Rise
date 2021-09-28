import React from "react";
import { useContext } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import CustomText from "_components/atoms/CustomText";
import RootContext from "_components/context/RootContext";
import { BLACK, GRAY } from "_styles/colors";
import { CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_16, FONT_SIZE_20 } from "_styles/typography";
import { SettingsDataType } from "_utils/ModeSettingsProps";
import ReanimatedSwitchToggle from "../modes/switchToggle/ReanimatedSwitchToggle";

const CreateModeOption = ({ item, onPress, index }: {
	item: SettingsDataType,
	onPress: (text: string, key: number) => void,
	index: number,
}): JSX.Element => {
	const { isTimerOn } = useContext(RootContext);
	const { valueToChange, valueInfoToShow, text, boolSetFunc } = item;
	const isToggleType = !(typeof valueToChange.value != "boolean");
	const isStringType = typeof valueToChange.value == "string";
	
	const reText = useDerivedValue(() => {
		return isToggleType ?
			"0" :
			valueToChange.value +
			(
				isStringType ?
					"" :
					" " + valueInfoToShow ?? ""
			);
	}, [valueToChange, valueInfoToShow]);
	
	return (
		<Pressable disabled={isTimerOn} onPress={() => isToggleType ? null : onPress(text, index)} style={styles.mainContainer}>
			<CustomText style={[styles.optionTextStyle, { textDecorationLine: isTimerOn ? "line-through" : "none", }]}>{text}</CustomText>
			{
				isToggleType ?
					<ReanimatedSwitchToggle
						disabled={isTimerOn}
						setFunc={boolSetFunc ?? (() => null)}
						animValue={valueToChange as Animated.SharedValue<boolean>}
					/> :
					<ReText text={reText} style={styles.optionDataTextStyle} />
			}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width: Dimensions.get("screen").width,
		paddingHorizontal: CONTENT_PADDING * 2,
		paddingVertical: (CONTENT_PADDING * 1.5) / 2,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},

	optionDataTextStyle: {
		paddingVertical: -((CONTENT_PADDING * 1.5) / 2),
		fontFamily: "FuturaPT-Book",
		fontSize: FONT_SIZE_16,
		color: GRAY,
	},

	optionTextStyle: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default CreateModeOption;
