import React from "react";
import { ColorValue, Pressable, View, ViewStyle } from "react-native";

import CreateSvgView from "../create/CreateSvgView";
import { WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { StyleSheet } from "react-native";
import { FONT_SIZE_20 } from "_styles/typography";
import { Color } from "react-native-svg";
import { CONTENT_PADDING } from "_styles/spacing";
import Animated from "react-native-reanimated";
import { ReText } from "react-native-redash";

const height = scaleSize(42);

interface Props {
	containerStyle?: ViewStyle,
	text: Animated.SharedValue<string>,
	icon?: () => JSX.Element,
	width: number,
	textColor: ColorValue,
	color: Color,
	onPress: () => void
}

const CreateModeButton = ({ containerStyle, icon, width, textColor, color, onPress, text }: Props): JSX.Element => {
	const Icon = icon;

	return (
		<Pressable style={containerStyle} onPress={onPress}>
			<CreateSvgView
				width={width}
				height={height}
				color={color}
				radius={21}
			/>
			<View style={[styles.buttonContainer, { width, paddingHorizontal: icon ? CONTENT_PADDING : 0, }]}>
				<ReText
					text={text}
					style={[styles.buttonText, { color: textColor }]}
				/>
				{Icon ? <Icon /> : null}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		height: "100%",
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},

	buttonText: {
		fontFamily: "FuturaPT-Medium",
		fontSize: FONT_SIZE_20,
		color: WHITE,
	},
});

export default CreateModeButton;
