import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainSettingsLanguageChange from "_components/molecules/profile/main-settings/MainSettingsLanguageChange";
import { WHITE } from "_styles/colors";
import { CONTENT_PADDING, HOME_TOP_PADDING, STATUS_HEIGHT } from "_styles/spacing";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import I18n from "i18n-js";

const LanguageSettingsScreen = (): JSX.Element => {
	return (
		<SafeAreaView style={styles.mainContainer}>
			<CreateGoBackView goBackText={I18n.t("settingsLanguage")} />
			<MainSettingsLanguageChange />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: WHITE,
		paddingTop: -STATUS_HEIGHT,
	},

	mapElement: {
		marginHorizontal: CONTENT_PADDING,
		paddingVertical: HOME_TOP_PADDING / 1.5,
	},
});

export default LanguageSettingsScreen;
