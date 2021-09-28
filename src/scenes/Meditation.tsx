/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MeditationAnimatedBall from "_components/atoms/modes/MeditationAnimatedBall";
import MeditationBreathSoundsIcon from "_components/atoms/modes/MeditationBreathSoundsIcon";
import I18n from "i18n-js";

import ModeSoundChooseIcon from "_atoms/modes/ModeSoundChooseIcon";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { WHITE } from "_styles/colors";
import { FONT_SIZE_20, FONT_SIZE_50 } from "_styles/typography";
import CreateModeScreen from "_components/molecules/create/CreateModeScreen";
import RootContext from "_components/context/RootContext";
import MeditationProgressBall from "_components/atoms/modes/MeditationProgressBall";
import { screenMainContainerStyle } from "_styles/spacing";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import ModeSettingsIcon from "_components/atoms/modes/ModeSettingsIcon";
import { setMeditationBreathSounds } from "_utils/mmkv/MmkvSetFunctions";

const MeditationScreen = (): JSX.Element => {
	const { isTimerOn, meditationBreathSounds } = useContext(RootContext);

	return (
		<SafeAreaView style={screenMainContainerStyle}>
			<CreateModeScreenContext.Provider
				value={{
					bottomBarLeftPart: {
						leftIcon: MeditationBreathSoundsIcon,
						leftText: I18n.t("meditationBreath")
					},
					bottomBarRightPart: {
						rightIcon: ModeSoundChooseIcon,
						rightText: I18n.t("modeSoundsChoose")
					},
					modal: {
						onPress: () => {
							meditationBreathSounds.value = !meditationBreathSounds.value;
							setMeditationBreathSounds(!meditationBreathSounds.value);
						},
						element: () => null,
					},
					background: () => null,
					goBack: () => <CreateGoBackView
						GoBackLeftElem={ModeSettingsIcon}
						goBackText={I18n.t("meditation")}
					/>,
					wrapper: isTimerOn ? MeditationProgressBall : MeditationAnimatedBall,
					firstInfoText: I18n.t("modeTimeToMeditate"),
					secondInfoText: I18n.t("modeChooseNecessaryTime"),
					swipeTextStyle: styles.swipeText,
					minutesToUse: "meditation",
					minStyle: styles.minText,
					mode: "meditation",
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
		color: WHITE,
	},

	minText: {
		fontSize: FONT_SIZE_20,
		color: WHITE,
	},
});

export default MeditationScreen;
