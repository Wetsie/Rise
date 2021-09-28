import { TextStyle } from "react-native";
import { scaleSize } from "_styles/mixins";

export const mainMinutes: number[] = new Array(36);
for (let i = 0, num = 5; i < mainMinutes.length; i++, num += 5) {
	mainMinutes[i] = num;
}

export const meditationMinutes: number[] = new Array(15);
for (let i = 0; i < meditationMinutes.length; i++) {
	meditationMinutes[i] = i + 1;
}

export const getMinStyle = (
	modeNavigation: "focus" | "meditation" | "nap" | "",
	activeModeIndex: number,
	minContextStyle: TextStyle,
	FLAT_LIST_HEIGHT: number,
	swipeTextSize: number,
): TextStyle => {
	return activeModeIndex !== 2 || modeNavigation !== "focus" ? {
		...minContextStyle,
		position: "absolute",
		marginTop: FLAT_LIST_HEIGHT - swipeTextSize / 2 - scaleSize(2),
		marginLeft: swipeTextSize * 1.5,
	} : {
		...minContextStyle,
		position: "absolute",
		marginTop: swipeTextSize / 2,
		marginLeft: swipeTextSize * 2.1,
	};
};

export const springConfig = {
	damping: 10,
	mass: 1,
	stiffness: 30,
	overshootClamping: true,
	restSpeedThreshold: 1,
	restDisplacementThreshold: 1,
};

export const keyExtractor = (index: unknown): string => (index as string).toString();