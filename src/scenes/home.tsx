import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import I18n from "i18n-js";

import HomeFocusIllustration from "_atoms/home/HomeFocusIllustration";
import GoodMorning from "_atoms/home/HomeGoodMorning";
import HomeMeditationIllustration from "_atoms/home/HomeMeditationIllustration";
import HomeNapIllustration from "_atoms/home/HomeNapIllustration";
import RootContext from "_components/context/RootContext";
import Modes from "_molecules/home/HomeGoToModes";
import { LBLUE } from "_styles/colors";
import { WIDTH_MINUS_PADDING } from "_styles/spacing";

const HomeScreen = (): JSX.Element => {
	const { modeNavigation, timerMinutes, isTimerOn } = useContext(RootContext);
	const navigation = useNavigation();

	const onPress = (navName: "MeditationNavigator" | "FocusNavigator" | "NapNavigator", modeName: "focus" | "meditation" | "nap") => {
		navigation.navigate(navName);
		modeNavigation.value = modeName;

		if (!isTimerOn) {
			if (modeName === "meditation") {
				timerMinutes.value = 1 * 60;
			} else {
				timerMinutes.value = 5 * 60;
			}
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<GoodMorning />
			<Modes
				Illustration={HomeMeditationIllustration}
				text={I18n.t("meditation")}
				viewSize="big"
				onPress={() => onPress("MeditationNavigator", "meditation")}
				disabled={modeNavigation.value !== "meditation" && isTimerOn}
			/>
			<View style={styles.modesSmallContainer}>
				<Modes
					Illustration={HomeFocusIllustration}
					text={I18n.t("focus")}
					viewSize="small"
					onPress={() => onPress("FocusNavigator", "focus")}
					disabled={modeNavigation.value !== "focus" && isTimerOn}
				/>
				<Modes
					Illustration={HomeNapIllustration}
					text={I18n.t("nap")}
					viewSize="small"
					onPress={() => onPress("NapNavigator", "nap")}
					disabled={modeNavigation.value !== "nap" && isTimerOn}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: LBLUE,
		alignItems: "center",
		flex: 1,
	},

	modesSmallContainer: {
		flexDirection: "row",
		width: WIDTH_MINUS_PADDING,
		justifyContent: "space-between",
	},
});

export default HomeScreen;
