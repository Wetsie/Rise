import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";

import ModeSwipeRenderItem from "_molecules/modes/ModeSwipeRenderItem";
import { keyExtractor, mainMinutes, meditationMinutes, springConfig } from "_utils/SwipeUtils";
import RootContext from "_components/context/RootContext";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";

const AFlatList = Animated.createAnimatedComponent(FlatList);

const ModeSwipe = (): JSX.Element => {
	const { minutesToUse } = useContext(CreateModeScreenContext);
	const { swipeTextSize: textSize, timerMinutes } = useContext(RootContext);
	const minutes = minutesToUse === "main" ? mainMinutes : meditationMinutes;

	const FLAT_LIST_HEIGHT = textSize * minutes.length + textSize;
	const snapPoints = minutes.map((_, i) => i * -textSize);
	const translateY = useSharedValue(0);
	
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, ctx: { offsetY: number }) => {
			ctx.offsetY = translateY.value;
		},
	
		onActive: (event, ctx: { offsetY: number }) => {
			translateY.value = clamp(ctx.offsetY + event.translationY, -minutes.length * textSize + textSize, 0);
		},
	
		onEnd: (event) => {
			translateY.value = 
			withSpring(
				snapPoint(translateY.value, event.velocityY, snapPoints),
				springConfig,
				(isFinished) => {
					if (isFinished) {
						const value = Math.floor(translateY.value / -textSize);
						timerMinutes.value = minutes[value] * 60;
					}
				}
			);
		},
	});

	const swipeStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value }
			],
		};
	});

	return (
		<View>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<AFlatList
					style={swipeStyle}
					data={minutes}
					contentContainerStyle={{
						marginTop: FLAT_LIST_HEIGHT - textSize,
						height: FLAT_LIST_HEIGHT,
						width: textSize * 1.5,
					}}
					renderItem={({ item, index }) => 
						<ModeSwipeRenderItem
							item={item}
							index={index}
							translateY={translateY}
							textSize={textSize}
						/>
					}
					keyExtractor={keyExtractor}
					scrollEnabled={false}
					showsVerticalScrollIndicator={false}
					overScrollMode="never"
				/>
			</PanGestureHandler>
		</View>
	);
};

export default ModeSwipe;
