import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import SettingNavigateArrow from "_components/atoms/profile/SettingNavigateArrow";
import { BLACK, WHITE } from "_styles/colors";
import { CONTENT_PADDING, MAIN_SETTINGS_ELEM_HEIGHT, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import CustomText from "_components/atoms/CustomText";
import { Shadow } from "react-native-shadow-2";
import { shadowPreset } from "_utils/MainSettingsUtils";

const MainSettingsElement = ({ text }: { text: string }): JSX.Element => {
	return (
		<Shadow {...shadowPreset}>
			<CreateSvgView
				height={MAIN_SETTINGS_ELEM_HEIGHT}
				width={WIDTH_MINUS_PADDING}
				color={WHITE}
			/>
			<View style={styles.contentStyle}>
				<CustomText style={styles.textStyle}>{text}</CustomText>
				<SettingNavigateArrow />
			</View>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	contentStyle: {
		position: "absolute",
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: CONTENT_PADDING,
	},

	textStyle: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default MainSettingsElement;
