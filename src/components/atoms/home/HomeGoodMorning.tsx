import * as React from "react";
import { StyleSheet, View } from "react-native";

import { CONTENT_PADDING, HOME_TOP_PADDING, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { FONT_SIZE_30 } from "_styles/typography";
import CustomText from "_components/atoms/CustomText";
import ProfileElementsView from "../ProfileElementsView";
import I18n from "i18n-js";
import { useContext } from "react";
import RootContext from "_components/context/RootContext";
import { useStateSafe } from "_utils/useStateSafe";

const GoodMorning = (): JSX.Element => {
	const [currentHours] = useStateSafe(new Date().getHours());
	const [greeting] = useStateSafe(
		currentHours >= 0 && currentHours < 6 ?
			I18n.t("goodNight") :
			currentHours >= 6 && currentHours < 12 ?
				I18n.t("goodMorning") :
				currentHours >= 12 && currentHours < 18 ?
					I18n.t("goodAfternoon") :
					I18n.t("goodEvening")
	);
	const { userInfo } = useContext(RootContext);

	return (
		<View style={styles.mainContainer}>
			<ProfileElementsView />
			<View style={styles.textContainer}>
				<CustomText
					numberOfLines={1}
					style={styles.goodMorningText}
				>{greeting}, {userInfo.firstName}</CustomText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		marginVertical: HOME_TOP_PADDING,
	},

	textContainer: {
		width: WIDTH_MINUS_PADDING - CONTENT_PADDING * 2,
		paddingLeft: CONTENT_PADDING * 2,
		position: "absolute",
	},

	goodMorningText: {
		fontSize: FONT_SIZE_30,
		color: "#0564F2",
	}
});

export default GoodMorning;