import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { BLACK, GRAY } from "_styles/colors";
import { CONTENT_PADDING, PROFILE_STAT_TEXT_MARGIN } from "_styles/spacing";
import { FONT_SIZE_16, FONT_SIZE_24 } from "_styles/typography";
import CustomText from "../../atoms/CustomText";

const CreateProfileStatsText = ({ type, text }: { type: "modeName" | "timeNumber" | "time", text: string | number }): JSX.Element => {
	let style: TextStyle = styles.mins;
	const customType: "medium" | undefined = type === "modeName" ? undefined : "medium";

	if (type === "modeName") {
		style = styles.modeName;
	} else if (type === "timeNumber") {
		style = styles.minsNumber;
	}

	return (
		<CustomText type={customType} style={style}>{text}</CustomText>
	);
};

const styles = StyleSheet.create({
	modeName: {
		marginLeft: CONTENT_PADDING / 2,
		fontSize: FONT_SIZE_16,
		color: BLACK,
	},

	minsNumber: {
		color: BLACK,
		fontSize: FONT_SIZE_24,
	},

	mins: {
		color: GRAY,
		fontSize: FONT_SIZE_16,
		marginLeft: CONTENT_PADDING / 2,
		marginBottom: PROFILE_STAT_TEXT_MARGIN,
	},
});

export default CreateProfileStatsText;