import I18n from "i18n-js";
import React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import CustomText from "_components/atoms/CustomText";
import RootContext from "_components/context/RootContext";
import { GRAY } from "_styles/colors";
import { CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_16 } from "_styles/typography";
import ReanimatedVolumeSlider from "./volumeSlider/ReanimatedVolumeSlider";
import VolumeIcon from "./volumeSlider/VolumeIcon";

const padding = CONTENT_PADDING * 4;
const availableWidth = Dimensions.get("window").width - padding * 2;

const ModeSliderSection = (): JSX.Element => {
	const { volume } = useContext(RootContext);
	const middleW = volume.value * availableWidth + padding;
	const knobX = useSharedValue(middleW);

	return (
		<View>
			<CustomText style={styles.sectionText}>{I18n.t("sound")}</CustomText>
			<View style={styles.sliderContainer}>
				<VolumeIcon xPos={knobX} />
				<ReanimatedVolumeSlider
					availableWidth={availableWidth}
					padding={padding}
					xPos={knobX}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sectionText: {
		paddingLeft: CONTENT_PADDING * 2,
		marginTop: CONTENT_PADDING,
		marginBottom: CONTENT_PADDING / 2,
		fontSize: FONT_SIZE_16,
		color: GRAY,
	},

	sliderContainer: {
		justifyContent: "center",
	},
});

export default ModeSliderSection;
