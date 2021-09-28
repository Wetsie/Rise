import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "_components/atoms/CustomText";
import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import { GRAY } from "_styles/colors";
import { CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_16 } from "_styles/typography";
import { SettingsDataType } from "_utils/ModeSettingsProps";
import CreateModeOption from "../create/CreateModeOption";

const ModeSettingsSection = ({ sectionHeader, text }: {
    sectionHeader: string,
    text?: SettingsDataType[],
}): JSX.Element => {
	const { onOptionPress } = useContext(CreateModeSettingsContext);

	return (
		<View>
			<CustomText style={styles.sectionText}>{sectionHeader}</CustomText>
			{
				text?.map((item, key) => {
					return (
						<View key={key}>
							<CreateModeOption
								item={item}
								onPress={onOptionPress}
								index={key}
							/>
						</View>
					);
				})
			}
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

export default ModeSettingsSection;
