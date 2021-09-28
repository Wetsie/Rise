/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "i18n-js";

import ModeSoundChooseIcon from "_components/atoms/modes/ModeSoundChooseIcon";
import NapAlarmIcon from "_components/atoms/modes/NapAlarmIcon";
import { DBLUE } from "_styles/colors";
import { FONT_SIZE_20, FONT_SIZE_50 } from "_styles/typography";
import CreateModeScreen from "_components/molecules/create/CreateModeScreen";
import NapTimerWrapper from "_components/atoms/modes/NapTimerWrapper";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { screenMainContainerStyle } from "_styles/spacing";
import NapGoBackView from "_components/molecules/modes/NapGoBackView";
import ModeSettingsIcon from "_components/atoms/modes/ModeSettingsIcon";
import NapBackgroundGradient from "_components/atoms/modes/NapBackgroundGradient";
import { useContext } from "react";
import RootContext from "_components/context/RootContext";
import { setIsAlarmOn } from "_utils/mmkv/MmkvSetFunctions";

const NapScreen = (): JSX.Element => {
	const { napIsAlarmOn } = useContext(RootContext);

	return (
		<SafeAreaView style={screenMainContainerStyle}> 
			<CreateModeScreenContext.Provider
				value={{
					bottomBarLeftPart: {
						leftIcon: NapAlarmIcon,
						leftText: I18n.t("napAlarm"),
					},
					bottomBarRightPart: {
						rightIcon: ModeSoundChooseIcon,
						rightText: I18n.t("modeSoundsChoose")
					},
					modal: {
						onPress: () => {
							napIsAlarmOn.value = !napIsAlarmOn.value;
							setIsAlarmOn(!napIsAlarmOn.value);
						},
						element: () => null,
					},
					background: () => <NapBackgroundGradient />,
					goBack: () => <NapGoBackView
						GoBackLeftElem={ModeSettingsIcon}
						goBackText={I18n.t("nap")}
					/>,
					wrapper: NapTimerWrapper,
					firstInfoText: I18n.t("modeTimeToNap"),
					secondInfoText: I18n.t("modeChooseNecessaryTime"),
					swipeTextStyle: styles.swipeText,
					minutesToUse: "main",
					minStyle: styles.minText,
					mode: "nap",
				}}
			>
				<CreateModeScreen />
			</CreateModeScreenContext.Provider> 
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	swipeText: {
		fontSize: FONT_SIZE_50,
		color: DBLUE,
	},

	minText: {
		fontSize: FONT_SIZE_20,
		color: DBLUE,
	},
});

export default NapScreen;
