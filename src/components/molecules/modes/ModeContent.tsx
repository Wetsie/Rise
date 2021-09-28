import React from "react";
import { StyleSheet, View } from "react-native";

import ModeInfoText from "./ModeInfoText";
import ModeTimerButton from "_components/molecules/modes/ModeTimerButton";
import TimerContent from "./TimerContent";

const ModeContent = (): JSX.Element => {
	return (
		<View style={styles.contentContainer}>
			<ModeInfoText />
			<TimerContent />
			<ModeTimerButton />
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1,
	},
});

export default ModeContent;
