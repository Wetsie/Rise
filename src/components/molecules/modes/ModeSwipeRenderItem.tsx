import React, { useContext } from "react";
import { StyleSheet, TextStyle } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import CustomText from "_components/atoms/CustomText";

const ModeSwipeRenderItem = ({ item, index, translateY, textSize, textStyle }: {
	item: unknown,
	index: number,
	translateY: Animated.SharedValue<number>,
	textSize: number,
	textStyle?: TextStyle,
}): JSX.Element => {
	const { swipeTextStyle } = useContext(CreateModeScreenContext);
	const normalizedItem = item as number < 10 ? "0" + (item as number) : item as number;
	const positionY = useDerivedValue(() => {
		return translateY.value + index * textSize;
	}, [translateY]);

	const isOnTop = -textSize;
	const isInMiddle = 0;
	const isOnBottom = textSize;

	const opacityStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				positionY.value,
				[isOnTop, isInMiddle, isOnBottom],
				[0.39, 1, 0.39]
			),
			transform: [
				{
					scale: interpolate(
						positionY.value,
						[isOnTop, isInMiddle, isOnBottom],
						[0.8, 1, 0.8]
					),
				},
				{
					translateY: interpolate(
						positionY.value,
						[isOnTop, isInMiddle, isOnBottom],
						[20, 0, -20]
					),
				}
			],
		};
	}, [positionY]);

	return (
		<Animated.View style={[styles.textContainer, opacityStyle]}>
			<CustomText style={textStyle ? textStyle : swipeTextStyle} type="demi">{normalizedItem}</CustomText>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	textContainer: {
		alignItems: "center"
	},
});

export default ModeSwipeRenderItem;
