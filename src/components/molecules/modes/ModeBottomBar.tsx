import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { DARK_MODE_MAIN, GRAY, WHITE } from "_styles/colors";
import { GO_BACK_VIEW_HEIGHT } from "_styles/spacing";
import CreateModeBarIcons from "../create/CreateModeBarIcons";
import CreateSvgView from "../create/CreateSvgView";
import AnimatedLine from "_components/atoms/AnimatedLine";
import RootContext from "_components/context/RootContext";

const { width } = Dimensions.get("window");

const CreateModeBottomBar = ({ onPress }: { onPress: () => void }): JSX.Element => {
	const navigation = useNavigation();
	const { mode } = useContext(CreateModeScreenContext);
	const { isTimerOn } = useContext(RootContext);
	const mainViewColor = mode === "nap" && isTimerOn ? DARK_MODE_MAIN : WHITE;
	const mainTextColor = mode === "nap" && isTimerOn ? WHITE : GRAY;

	return (
		<View>
			<CreateSvgView
				width={width}
				height={GO_BACK_VIEW_HEIGHT}
				color={mainViewColor}
				radius={0}
			/>
			<View style={styles.barContentContainer}>
				<Pressable
					hitSlop={30}
					style={styles.iconPressable}
					onPress={onPress}
					disabled={mode === "focus" && isTimerOn}
				>
					<CreateModeBarIcons color={mainTextColor} type="left" />
					{mode === "focus" && <AnimatedLine animatedValue={!isTimerOn} style={styles.animatedLineStyle} />}
				</Pressable>
				<Pressable
					hitSlop={30}
					style={styles.iconPressable}
					onPress={() => navigation.navigate("Sounds")}
					disabled={isTimerOn}
				>
					<CreateModeBarIcons color={mainTextColor} type="right" />
					<AnimatedLine color={mainTextColor} animatedValue={!isTimerOn} style={styles.animatedLineStyle} />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	barContentContainer: {
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		height: "100%",
		width: "100%",
	},

	iconPressable: {
		alignItems: "center"
	},

	animatedLineStyle: {
		position: "absolute",
	}
});

export default React.memo(CreateModeBottomBar);
