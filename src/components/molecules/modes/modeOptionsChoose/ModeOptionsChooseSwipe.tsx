import React, { useContext, useCallback } from "react";
import { View, ViewStyle } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";

import RootContext from "_components/context/RootContext";
import { DBLUE } from "_styles/colors";
import { FONT_SIZE_50 } from "_styles/typography";
import { springConfig } from "_utils/SwipeUtils";
import ModeSwipeRenderItem from "../ModeSwipeRenderItem";

const ModeOptionsChooseSwipe = ({ style, valueToSetOnEnd }: {
	style: ViewStyle | ViewStyle[],
	valueToSetOnEnd: Animated.SharedValue<number | string | boolean>
}): JSX.Element => {
	const { swipeTextSize: textSize } = useContext(RootContext);
	const { arrayToMap } = useContext(CreateModeSettingsContext);

	const translateY = useSharedValue(0);
	const snapPoints = arrayToMap.map((_, i) => i * -textSize);
	
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, ctx: { offsetY: number }) => {
			ctx.offsetY = translateY.value;
		},
	
		onActive: (event, ctx: { offsetY: number }) => {
			translateY.value = clamp(ctx.offsetY + event.translationY, -arrayToMap.length * textSize + textSize, 0);
		},
	
		onEnd: (event) => {
			translateY.value = 
			withSpring(
				snapPoint(translateY.value, event.velocityY, snapPoints),
				springConfig,
				(isFinished) => {
					if (isFinished) {
						const value = Math.floor(translateY.value / -textSize);
						valueToSetOnEnd.value = arrayToMap[value];
					}
				}
			);
		},

		onFinish: () => {
			const value = Math.floor(translateY.value / -textSize);
			valueToSetOnEnd.value = arrayToMap[value];
		}
	});

	const swipeStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value }
			],
		};
	});

	return (
		<View style={style}>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View style={swipeStyle}>
					{
						arrayToMap.map(
							useCallback((item, index) => (
								<View key={index}>
									<ModeSwipeRenderItem
										item={item}
										index={index}
										translateY={translateY}
										textSize={textSize}
										textStyle={{
											fontSize: FONT_SIZE_50,
											color: DBLUE,
										}}
									/>
								</View>
							), [])
						)
					}
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

export default ModeOptionsChooseSwipe;
