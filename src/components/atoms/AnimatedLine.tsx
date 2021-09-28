import * as React from "react";
import { useEffect } from "react";
import { View, ViewProps } from "react-native";
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { interpolatePath, parse } from "react-native-redash";
import Svg, { Color, Path } from "react-native-svg";
import { GRAY } from "_styles/colors";
import { iconSvgProps, iconViewProps } from "_styles/spacing";
import { DEFAULT_ANIMATION_DUR } from "_utils/Animations";

const APath = Animated.createAnimatedComponent(Path);

const AnimatedLine = (props?: ViewProps & { animatedValue: number | boolean, color?: Color }): JSX.Element => {
	const animatedValue = props?.animatedValue;
	const p1 = parse("M0 27.606l2.121 2.121L29.715 2.133 27.594.013 0 27.605z");
	const p2 = parse("M0 27.606l2.121 2.121.002-.002-2.12-2.121-.003.002z");

	const isToggled = useSharedValue(animatedValue ? 1 : 0);
	const transition = useDerivedValue(() => {
		return withTiming(isToggled.value, { duration: DEFAULT_ANIMATION_DUR });
	}, [isToggled]);

	useEffect(() => {
		isToggled.value = animatedValue ? 1 : 0;
	}, [isToggled, animatedValue]);

	const animatedProps = useAnimatedProps(() => {
		const d = interpolatePath(transition.value, [0, 1], [p1, p2]);
		return {
			d,
		};
	});

	return (
		<View style={[iconViewProps.style, props?.style]}>
			<Svg {...iconSvgProps}>
				<APath fill={props?.color ?? GRAY} animatedProps={animatedProps} />
			</Svg>
		</View>
	);
};

export default AnimatedLine;
