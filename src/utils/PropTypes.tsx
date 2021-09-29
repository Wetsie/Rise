import { TextStyle, ViewStyle } from "react-native";
import { Color } from "react-native-svg";

export type ModeBottomBarProps = {
	bottomBarLeftPart: {
		leftIcon: ({ color }: { color: Color }) => JSX.Element | null,
		leftText: string,
	},
	bottomBarRightPart: {
		rightIcon: ({ color }: { color: Color }) => JSX.Element | null,
		rightText: string,
	},
}

export interface ModeInfoTextProps {
	firstInfoText: string,
	secondInfoText: string
}

export interface CreateModeSwipeProps {
	swipeTextStyle: TextStyle,
	minutesToUse?: "main" | "meditation" | ""
}

export interface TimerContentProps {
    wrapper: () => JSX.Element | null,
	minStyle: TextStyle,
}

export interface GoBackProps {
	style?: ViewStyle,
	GoBackLeftElem?: ({ color, onPress }: { color: Color, onPress: () => void }) => JSX.Element | null,
	goBackText: string
}

export type UserInfo = {
	firstName: string,
	lastName: string,
	dateOfBirth: string,
	balance: number,
	purchases: string[],
	proVersion: boolean,
	stat: {
		focus: number,
		meditation: number,
		nap: number,
	}
}