import I18n from "i18n-js";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Toast from "react-native-toast-message";
import { BLACK } from "_styles/colors";
import { scaleFont, scaleSize } from "_styles/mixins";
import { CONTENT_PADDING } from "_styles/spacing";
import { IMMERSIVE_MODE_SECONDS } from "_utils/RootComponentUtils";
import CustomText from "../CustomText";

const FullImmersionExplanation = (): JSX.Element => {
	return (
		<Pressable
			hitSlop={30}
			style={{
				marginLeft: CONTENT_PADDING,
				aspectRatio: scaleSize(15) / scaleSize(15),
				height: scaleSize(15),
				alignItems: "center",
				justifyContent: "center",
			}}
			onPress={
				() => Toast.show({
					type: "info",
					position: "bottom",
					text1: I18n.t("warning"),
					text2: I18n.t("immersiveModeAlert1") + " " + IMMERSIVE_MODE_SECONDS / 1000 + " " + I18n.t("immersiveModeAlert2"),
				})
			}
		>
			<Svg
				width="100%"
				height="100%"
				fill="none"
			>
				<Circle cx={7.5} cy={7.5} r={7.5} fill="#fff" />
			</Svg>
			<CustomText style={styles.text}>?</CustomText>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	text: {
		position: "absolute",
		fontSize: scaleFont(10),
		color: BLACK,
	}
});

export default FullImmersionExplanation;
