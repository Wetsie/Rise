import React from "react";
import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import InfinityIcon from "_components/atoms/modes/InfinityIcon";
import PomodoroIcon from "_components/atoms/modes/PomodoroIcon";
import TimerIcon from "_components/atoms/modes/TimerIcon";
import { BLACK, WHITE } from "_styles/colors";
import { BOTTOM_SHEET_HEIGHT } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CreateFocusBottomSheetItem from "../create/CreateFocusBottomSheetItem";
import CreateSvgView from "../create/CreateSvgView";
import { useContext } from "react";
import RootContext from "_components/context/RootContext";
import { setFocusActiveMode } from "_utils/mmkv/MmkvSetFunctions";

const { width } = Dimensions.get("window");

const FocusBottomSheetContent = (): JSX.Element => {
	const { activeModeIndex, setActiveModeIndex } = useContext(RootContext);
	const icons = [
		TimerIcon,
		PomodoroIcon,
		InfinityIcon,
	];
	const names = [
		I18n.t("timer"),
		I18n.t("pomodoro"),
		I18n.t("infinite"),
	];

	const onPress = (value: number) => {
		setActiveModeIndex(value);
		setFocusActiveMode(value);
	};
    
	return (
		<View>
			<CreateSvgView
				width={width}
				height={BOTTOM_SHEET_HEIGHT}
				color={WHITE}
				radius={0}
			/>
			<View style={styles.mainChild}>
				<CustomText style={styles.modesText}>{I18n.t("focusModesChoose")}</CustomText>
				{icons.map((item, key) => (
					<Pressable key={key} onPress={() => onPress(key)}>
						<CreateFocusBottomSheetItem icon={item} text={names[key]} active={key === activeModeIndex} />
					</Pressable>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainChild: {
		width: "100%",
		height: "100%",
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-evenly",
	},

	modesText: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default FocusBottomSheetContent;
