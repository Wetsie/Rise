import * as React from "react";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { GRAY } from "_styles/colors";
import { FONT_SIZE_16 } from "_styles/typography";
import CustomText from "_components/atoms/CustomText";
import { Color } from "react-native-svg";

const CreateModeBarIcons = ({ color, type }: { color?: Color, type: "left" | "right" }): JSX.Element => {
	const { bottomBarLeftPart, bottomBarRightPart } = useContext(CreateModeScreenContext);
	const Icon = type === "left" ? bottomBarLeftPart.leftIcon : bottomBarRightPart.rightIcon;
	const text = type === "left" ? bottomBarLeftPart.leftText : bottomBarRightPart.rightText;

	return (
		<View style={styles.mainContainer}>
			<Icon color={color ?? GRAY} />
			<CustomText style={[styles.text, { color: color?.toString() ?? GRAY }]}>{text}</CustomText>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: "center",
	},

	text: {
		fontSize: FONT_SIZE_16,
	},
});

export default CreateModeBarIcons;
