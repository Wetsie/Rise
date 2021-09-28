import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { DBLUE, GRAY } from "_styles/colors";
import { FONT_SIZE_20, FONT_SIZE_24 } from "_styles/typography";
import CustomText from "_components/atoms/CustomText";

const CreateModeInfoText = (): JSX.Element => {
	const { firstInfoText, secondInfoText } = useContext(CreateModeScreenContext);

	return (
		<View style={styles.infoTextContainer}>
			<CustomText style={styles.grayMainText}>{firstInfoText}</CustomText>
			<CustomText type="medium" style={styles.dblueMainText}>{secondInfoText}</CustomText>
		</View>
	);
};

const styles = StyleSheet.create({
	infoTextContainer: {
		alignItems: "center",
	},

	grayMainText: {
		fontSize: FONT_SIZE_20,
		color: GRAY,
	},

	dblueMainText: {
		fontSize: FONT_SIZE_24,
		color: DBLUE,
	},
});

export default CreateModeInfoText;
