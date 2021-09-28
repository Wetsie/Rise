import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import RootContext from "_components/context/RootContext";
import { DBLUE } from "_styles/colors";
import { FONT_SIZE_24 } from "_styles/typography";
import CustomText from "../CustomText";
import ConfettiView from "./ConfettiView";
import { useStateSafe } from "_utils/useStateSafe";
import I18n from "i18n-js";

const HappyBirthdayModal = (): JSX.Element => {
	const { firstName } = useContext(RootContext).userInfo;
	const [showAnimation, setShowAnimation] = useStateSafe(true);
	const happyBirthdayRef = useRef<LottieView>(null);

	useEffect(() => {
		happyBirthdayRef.current?.play();
	}, []);

	return (
		<View style={styles.mainContainer}>
			<ConfettiView />
			<View style={styles.happyBirthdayContainer}>
				<CustomText style={styles.happyBirthdayText}>{I18n.t("happyBirthday")}</CustomText>
				<CustomText style={styles.happyBirthdayText}>{firstName}</CustomText>
			</View>
			{
				showAnimation ?
					<LottieView
						source={require("_assets/animations/happyBirthdayAnim")}
						onAnimationFinish={() => setShowAnimation(false)}
						ref={happyBirthdayRef}
						loop={false}
					/> : null
			}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},

	happyBirthdayContainer: {
		position: "absolute",
	},

	happyBirthdayText: {
		textAlign: "center",
		fontSize: FONT_SIZE_24,
		color: DBLUE,
	}
});

export default HappyBirthdayModal;
