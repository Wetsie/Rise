/* eslint-disable indent */
import React from "react";
import { ViewStyle } from "react-native";
import { Color } from "react-native-svg";
import { CreateModeSwipeProps, ModeBottomBarProps, ModeInfoTextProps, TimerContentProps } from "_utils/PropTypes";

const CreateModeScreenContext = React.createContext<
	TimerContentProps &
	ModeBottomBarProps &
	ModeInfoTextProps &
	CreateModeSwipeProps &
{
	mode: "focus" | "meditation" | "nap" | "",
	modal: {
		onPress: () => void,
		element: () => JSX.Element | null,
	},
	goBack: () => JSX.Element | null,
	background: () => JSX.Element | null,
	style?: ViewStyle,
	GoBackLeftElem?: ({ color, onPress }: { color: Color, onPress: () => void }) => JSX.Element | null,
}>({
	bottomBarLeftPart: {
		leftIcon: () => null,
		leftText: "",
	},
	bottomBarRightPart: {
		rightIcon: () => null,
		rightText: "",
	},
	firstInfoText: "",
	secondInfoText: "",
	swipeTextStyle: {},
	minutesToUse: "",
	modal: {
		onPress: () => null,
		element: () => null,
	},
	background: () => null,
	wrapper: () => null,
	goBack: () => null,
	minStyle: {},
	GoBackLeftElem: () => null,
	mode: "",
});

export default CreateModeScreenContext;