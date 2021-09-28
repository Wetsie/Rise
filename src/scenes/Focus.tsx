/* eslint-disable react/display-name */
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import I18n from "i18n-js";

import { DBLUE, LBLUE } from "_styles/colors";
import { STATUS_HEIGHT } from "_styles/spacing";
import FocusModeChooseIcon from "_components/atoms/modes/FocusModeChooseIcon";
import ModeSoundChooseIcon from "_components/atoms/modes/ModeSoundChooseIcon";
import CreateModeScreen from "_components/molecules/create/CreateModeScreen";
import FocusProgressBar from "_components/atoms/modes/FocusProgressBar";
import { FONT_SIZE_20, FONT_SIZE_50 } from "_styles/typography";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import ModeSettingsIcon from "_components/atoms/modes/ModeSettingsIcon";
import FocusBottomSheetContent from "_components/molecules/modes/FocusBottomSheetContent";

const FocusScreen = (): JSX.Element => {
	const modalizeRef = useRef<Modalize>(null);
	
	const onPress = () => {
		modalizeRef.current?.open();
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<CreateModeScreenContext.Provider
				value={{
					bottomBarLeftPart: {
						leftIcon: FocusModeChooseIcon,
						leftText: I18n.t("focusModesChoose")
					},
					bottomBarRightPart: {
						rightIcon: ModeSoundChooseIcon,
						rightText: I18n.t("modeSoundsChoose"),
					},
					modal: {
						onPress,
						element: () =>
							<Modalize
								ref={modalizeRef}
								closeOnOverlayTap={true}
								overlayStyle={styles.overlayStyle}
								withHandle={false}
								adjustToContentHeight={true}
							>
								<FocusBottomSheetContent />
							</Modalize>
					},
					background: () => null,
					goBack: () => <CreateGoBackView
						GoBackLeftElem={ModeSettingsIcon}
						goBackText={I18n.t("focus")}
					/>,
					wrapper: FocusProgressBar,
					firstInfoText: I18n.t("modeTimeToFocus"),
					secondInfoText: I18n.t("modeChooseNecessaryTime"),
					swipeTextStyle: styles.text,
					minutesToUse: "main",
					minStyle: styles.minText,
					mode: "focus",
				}}
			>
				<CreateModeScreen />
			</CreateModeScreenContext.Provider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: LBLUE,
		paddingTop: -STATUS_HEIGHT
	},

	text: {
		fontSize: FONT_SIZE_50,
		color: DBLUE,
	},

	minText: {
		fontSize: FONT_SIZE_20,
		color: DBLUE,
	},

	overlayStyle: {
		backgroundColor: "transparent"
	}
});

export default FocusScreen;
