import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "_components/atoms/CustomText";
import { BLACK } from "_styles/colors";
import { CONTENT_PADDING, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import ChooseIndicator from "_components/atoms/modes/ChooseIndicator";

const CreateFocusBottomSheetItem = ({ icon, text, active }: { icon: () => JSX.Element, text: string, active: boolean }): JSX.Element => {
	const Icon = icon;

	return (
		<View style={styles.mainContainer}>
			<View style={styles.iconContainer}>
				<Icon />
				<CustomText style={styles.text}>{text}</CustomText>
			</View>
			{active ? <ChooseIndicator /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width: WIDTH_MINUS_PADDING - CONTENT_PADDING * 2,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	iconContainer: {
		flexDirection: "row",
		alignItems: "center",
	},

	text: {
		paddingLeft: CONTENT_PADDING,
		fontSize: FONT_SIZE_20,
		color: BLACK,  
	},
});

export default CreateFocusBottomSheetItem;
