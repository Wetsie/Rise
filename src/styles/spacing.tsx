import { StatusBar, ViewProps, ViewStyle } from "react-native";
import { Dimensions } from "react-native";
import { SvgProps } from "react-native-svg";
import { LBLUE } from "./colors";
import { scaleSize } from "./mixins";

export const SCALE_18 = scaleSize(18);
export const SCALE_16 = scaleSize(16);
export const SCALE_12 = scaleSize(12);
export const SCALE_8 = scaleSize(8);
export const SCALE_4 = scaleSize(4);

export const HOME_TOP_PADDING = scaleSize(14);
export const CONTENT_PADDING = scaleSize(16);
export const WIDTH_MINUS_PADDING = Dimensions.get("window").width - CONTENT_PADDING * 2;

export const PROFILE_ELEMENTS_HEIGHT = scaleSize(70);

export const MAIN_SMALL_SVG_HEIGHT = scaleSize(210);
export const MAIN_SMALL_SVG_WIDTH = WIDTH_MINUS_PADDING / 2 - CONTENT_PADDING / 2;
export const STATUS_HEIGHT = StatusBar.currentHeight ?? 0;

export const DOWNLOAD_BUTTON_HEIGHT = scaleSize(28);
export const WHOLE_SOUND_ELEM_HEIGHT = MAIN_SMALL_SVG_HEIGHT + DOWNLOAD_BUTTON_HEIGHT / 2;

export const BOTTOM_SHEET_HEIGHT = scaleSize(250);
export const MAIN_ICON_SIZE = scaleSize(30);
export const PROFILE_STAT_TEXT_MARGIN = scaleSize(2);
export const GO_BACK_VIEW_HEIGHT = scaleSize(80);
export const MAIN_SETTINGS_ELEM_HEIGHT = scaleSize(46);

export const SHOP_DOWNLOAD_ICONS_SIZE = scaleSize(22);
export const PROFILE_DOT_SIZE = scaleSize(5);

export const getFlatListHeight = (textSize: number, minutes: number[]): number => textSize * minutes.length + textSize;

export const PROGRESS_BAR_SIZE = scaleSize(230);
export const TOGGLE_CIRCLE_SIZE = scaleSize(24);

export const iconViewProps: ViewProps = {
	style: {
		aspectRatio: MAIN_ICON_SIZE / MAIN_ICON_SIZE,
		height: MAIN_ICON_SIZE,
	},
};

export const iconSvgProps: SvgProps = {
	width: "100%",
	height: "100%",
	viewBox: "0 0 30 30",
	fill: "none",
};

export const screenMainContainerStyle: ViewStyle = {
	flex: 1,
	backgroundColor: LBLUE,
	paddingTop: -STATUS_HEIGHT,
};