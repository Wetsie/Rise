import React, { ReactChild, useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { mix } from "react-native-redash";
import { DEFAULT_ANIMATION_DUR } from "_utils/Animations";

interface AViewPropsType {
	animationValue: number | boolean,
	children: ReactChild | ReactChild[] | unknown[],
}

const AnimatedOpacityView = (props: AViewPropsType & ViewProps): JSX.Element => {
	const { animationValue, children } = props;
	const isToggled = useSharedValue(0);

	useEffect(() => {
		isToggled.value = animationValue ? 1 : 0;
	}, [isToggled, animationValue]);

	const transition = useDerivedValue(() => {
		return withTiming(isToggled.value, { duration: DEFAULT_ANIMATION_DUR });
	}, [isToggled]);

	const style = useAnimatedStyle(() => {
		return {
			opacity: mix(transition.value, 0, 1)
		};
	}, [transition]);

	return (
		<Animated.View style={[style, props?.style]} {...props}>
			{children}
		</Animated.View>
	);
};

export default AnimatedOpacityView;