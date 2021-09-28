import React from "react";
import MainSettingsElement from "_components/molecules/profile/main-settings/MainSettingsElements";
import { GRAY } from "_styles/colors";
import { navType } from "_styles/mixins";
import I18n from "i18n-js";
import { Linking } from "react-native";

const PLAYMARKET_PAGE_LINK = "https://play.google.com/store/apps/details?id=com.riseprojectv3";

const names = [
	I18n.t("settingsAccount"),
	I18n.t("settingsLanguage"),
	I18n.t("settingsRateUs"),
	I18n.t("settingsAboutMe"),
];

export const shadowPreset = {
	startColor: GRAY + "17",
	finalColor: GRAY + "00",
	radius: 15,
	distance: 15
};

export const settingsArray: JSX.Element[] = [];
for (let index = 0; index < names.length; index++) {
	settingsArray[index] = <MainSettingsElement text={names[index]} />;
}

export const onSettingsItemPress = async (key: number, navigation: navType, modalCallback: () => void): Promise<void> => {
	if (!key) {
		navigation.navigate("AccountSettingsNavigator");
	} else if (key === 1) {
		navigation.navigate("LanguageSettings");
	} else if (key === 2) {
		const supported = await Linking.canOpenURL(PLAYMARKET_PAGE_LINK);

		if (supported) {
			await Linking.openURL(PLAYMARKET_PAGE_LINK);
		}
	} else if (key === 3) {
		modalCallback();
	}
};

export interface MainAppLanguageTypes {
	text: "Русский" | "English" | "Español"
}

export const mainAppLanguageCodes = {
	"Русский": "ru",
	"English": "en",
	"Español": "es",
};