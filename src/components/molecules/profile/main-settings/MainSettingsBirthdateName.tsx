import React, { useContext }  from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import CustomText from "_components/atoms/CustomText";
import SettingsNameChangeIcon from "_components/atoms/profile/SettingsNameChangeIcon";
import { CONTENT_PADDING, HOME_TOP_PADDING } from "_styles/spacing";
import { FONT_SIZE_16, FONT_SIZE_20 } from "_styles/typography";
import { BLACK, GRAY } from "_styles/colors";
import RootContext from "_components/context/RootContext";

const { width } = Dimensions.get("window");

const MainSettingsBirthdateName = (): JSX.Element => {
	const { firstName, lastName, dateOfBirth } = useContext(RootContext).userInfo;
	
	return (
		<View style={styles.mainInfoChange}>
			<CustomText numberOfLines={1} style={styles.nameText}>{firstName} {lastName}</CustomText>
			<View style={styles.birthdateContainer}>
				<CustomText style={styles.birthdateText}>{dateOfBirth}</CustomText>
				<SettingsNameChangeIcon />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainInfoChange: {
		marginVertical: HOME_TOP_PADDING * 1.5,
		alignItems: "center",
	},

	birthdateContainer: {
		marginTop: HOME_TOP_PADDING / 4,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},

	nameText: {
		width: width - CONTENT_PADDING * 2,
		fontSize: FONT_SIZE_20,
		textAlign: "center",
		color: BLACK,
	},

	birthdateText: {
		marginRight: CONTENT_PADDING,
		fontSize: FONT_SIZE_16,
		color: GRAY,
	},
});

export default MainSettingsBirthdateName;
