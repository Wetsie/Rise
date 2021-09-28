import { NavigationProp } from "@react-navigation/native";
import { Dimensions, PixelRatio, ViewStyle } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const guidelineBaseWidth = 360;

export const scaleSize = (size: number): number => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

const dimensions = (top: number, right = top, bottom = top, left = right, property: string) => {
	const styles: Record<string, unknown> = {};

	styles[`${property}Top`] = top;
	styles[`${property}Right`] = right;
	styles[`${property}Bottom`] = bottom;
	styles[`${property}Left`] = left;

	return styles;
};

export const center: ViewStyle = {
	alignItems: "center",
	justifyContent: "center",
};

export const margin = (top: number, right: number, bottom: number, left: number): Record<string, unknown> => {
	return dimensions(top, right, bottom, left, "margin");
};

export const padding = (top: number, right: number, bottom: number, left: number): Record<string, unknown> => {
	return dimensions(top, right, bottom, left, "padding");
};

export type navType = NavigationProp<ReactNavigation.RootParamList>;