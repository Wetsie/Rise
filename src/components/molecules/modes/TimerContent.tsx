import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { getFlatListHeight } from "_styles/spacing";
import CustomText from "_components/atoms/CustomText";
import RootContext from "_components/context/RootContext";
import { getMinStyle, mainMinutes, meditationMinutes } from "_utils/SwipeUtils";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import I18n from "i18n-js";
import TimerContentItem from "./TimerContentItem";

const TimerContent = (): JSX.Element => {
	const { swipeTextSize, activeModeIndex } = useContext(RootContext);
	const { minutesToUse, wrapper: Wrapper, minStyle: minContextStyle, mode } = useContext(CreateModeScreenContext);
	const FLAT_LIST_HEIGHT = getFlatListHeight(swipeTextSize, minutesToUse === "main" ? mainMinutes : meditationMinutes);

	return (
		<View style={styles.progressBarContainer}>
			<Wrapper />
			<View style={styles.swipeContainer}>
				<TimerContentItem />
				{
					activeModeIndex === 2 && mode === "focus" ?
						null :
						<CustomText type="demi" style={
							getMinStyle(
								mode,
								activeModeIndex,
								minContextStyle,
								FLAT_LIST_HEIGHT,
								swipeTextSize
							)
						}>{I18n.t("min")}</CustomText>
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	progressBarContainer: {
		alignItems: "center",
		justifyContent: "center",
	},

	swipeContainer: {
		flexDirection: "row",
		position: "absolute",
	},
});

export default TimerContent;
