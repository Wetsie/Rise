import React, { useContext } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { ReText } from "react-native-redash";
import CustomText from "_components/atoms/CustomText";

import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import RootContext from "_components/context/RootContext";
import { BLACK, DBLUE, WHITE } from "_styles/colors";
import { BOTTOM_SHEET_HEIGHT, CONTENT_PADDING } from "_styles/spacing";
import { FONT_SIZE_20, FONT_SIZE_24 } from "_styles/typography";
import { SettingsDataType } from "_utils/ModeSettingsProps";
import CreateSvgView from "../../create/CreateSvgView";
import ModeOptionsChooseSwipe from "./ModeOptionsChooseSwipe";

const width = Dimensions.get("window").width;
const height = BOTTOM_SHEET_HEIGHT;

const ModeOptionChooseContent = (): JSX.Element => {
	const { modalHeader, optionKey, data: externalData } = useContext(CreateModeSettingsContext);
	const { swipeTextSize } = useContext(RootContext);
	const itemNames: SettingsDataType[] = [];
	
	externalData.map((item, key) => {
		if (typeof item.valueToChange.value == "number" || typeof item.valueToChange.value == "string") {
			itemNames[key] = item;
		}
	}); // select only elements with a swipe from the array
	const { valueToChange, valueInfoToShow } = itemNames[optionKey.value];

	return (
		<View>
			<CreateSvgView
				width={width}
				height={height}
				color={WHITE}
				radius={0}
			/>
			<View style={styles.content}>
				<ReText text={modalHeader} style={styles.header} />
			</View>
			<ModeOptionsChooseSwipe
				style={[
					styles.swipeContainer,
					{
						justifyContent: "center",
						width,
					}
				]}
				valueToSetOnEnd={valueToChange}
			/>
			<View style={styles.swipeContainer}>
				<CustomText
					type="medium"
					style={[
						styles.additText,
						{
							marginLeft: width / 2 + swipeTextSize / 1.5,
							marginTop: swipeTextSize / 2.3,
						}
					]}
				>{valueInfoToShow}</CustomText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		width: "100%",
		height: "100%",
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: CONTENT_PADDING,
		paddingBottom: CONTENT_PADDING * 2,
		zIndex: 1,
	},

	swipeContainer: {
		position: "absolute",
		marginTop: BOTTOM_SHEET_HEIGHT / 2,
	},

	header: {
		fontFamily: "FuturaPT-Book",
		fontSize: FONT_SIZE_24,
		color: BLACK,
	},

	additText: {
		fontSize: FONT_SIZE_20,
		color: DBLUE,
	}
});

export default ModeOptionChooseContent;
