import React, { useContext } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import GoBackArrow from "_components/atoms/profile/GoBackArrow";
import { BLACK, DARK_MODE_MAIN, WHITE } from "_styles/colors";
import { CONTENT_PADDING, GO_BACK_VIEW_HEIGHT, STATUS_HEIGHT } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CreateSvgView from "../create/CreateSvgView";
import CustomText from "../../atoms/CustomText";
import { useNavigation } from "@react-navigation/native";
import RootContext from "_components/context/RootContext";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Color } from "react-native-svg";
import { GoBackProps } from "_utils/PropTypes";

const NapGoBackView = ({ GoBackLeftElem, goBackText }: GoBackProps & {
	GoBackLeftElem: ({ color, onPress }: { color: Color, onPress: () => void }) => JSX.Element | null
}): JSX.Element => {
	const { isTimerOn } = useContext(RootContext);
	const navigation = useNavigation();
	const mainViewColor = isTimerOn ? DARK_MODE_MAIN : WHITE;
	const mainTextColor = isTimerOn ? WHITE : BLACK;
	
	useEffect(() => {
		if (isTimerOn) {
			StatusBar.setBarStyle("light-content");
		}

		return () => {
			StatusBar.setBarStyle("dark-content");
		};
	}, [isTimerOn]);

	return (
		<View>
			<CreateSvgView
				height={GO_BACK_VIEW_HEIGHT + STATUS_HEIGHT}
				width={Dimensions.get("window").width}
				color={mainViewColor}
				radius={0}
			/>
			<View style={styles.contentStyle}>
				<Pressable hitSlop={30} onPress={() => navigation.goBack()}>
					<GoBackArrow color={mainTextColor} />
				</Pressable>
				<CustomText style={[styles.optionsText, { color: mainTextColor }]}>{goBackText}</CustomText>
				<GoBackLeftElem
					onPress={() => navigation.navigate("ModeSettings")}
					color={mainTextColor}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contentStyle: {
		width: "100%",
		height: "100%",
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: CONTENT_PADDING * 2,
		paddingTop: STATUS_HEIGHT,
	},

	optionsText: {
		fontSize: FONT_SIZE_20,
	},
});

export default React.memo(NapGoBackView);
