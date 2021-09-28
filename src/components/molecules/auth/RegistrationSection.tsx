import React from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "_components/atoms/CustomText";
import { DBLUE, LBLUE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { CONTENT_PADDING, HOME_TOP_PADDING } from "_styles/spacing";
import { FONT_SIZE_16 } from "_styles/typography";

const RegistrationSection = ({
	text,
	firstElement: FirstElement,
	secondElement: SecondElement,
}: {
    text: string,
    firstElement: () => JSX.Element,
    secondElement: () => JSX.Element,
}): JSX.Element => {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.socialMediaTextContainer}>
				<View style={[styles.line, { marginRight: CONTENT_PADDING }]} />
				<CustomText style={styles.socialMediaText}>{text}</CustomText>
				<View style={[styles.line, { marginLeft: CONTENT_PADDING }]} />
			</View>
			<View style={styles.buttonContainer}>
				<FirstElement />
			</View>
			<View style={styles.buttonContainer}>
				<SecondElement />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: HOME_TOP_PADDING,
	},

	buttonContainer: {
		marginTop: HOME_TOP_PADDING,
	},

	line: {
		backgroundColor: LBLUE,
		height: scaleSize(2),
		flex: 1,
	},

	socialMediaTextContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},

	socialMediaText: {
		fontSize: FONT_SIZE_16,
		color: DBLUE,
	},
});

export default RegistrationSection;
