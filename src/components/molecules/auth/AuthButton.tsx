import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "_components/atoms/CustomText";
import { DBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import CreateSvgView from "../create/CreateSvgView";

const AuthButton = ({ text }: { text: string }): JSX.Element => {
	return (
		<View style={styles.mainContainer}>
			<CreateSvgView
				width={scaleSize(302)}
				height={scaleSize(56)}
				color={DBLUE}
			/>
			<CustomText style={styles.text}>{text}</CustomText>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		position: "absolute",
		color: WHITE,
		fontSize: 20,
	},
});

export default AuthButton;
