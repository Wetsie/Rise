import React, { useContext } from "react";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedProps, useDerivedValue, withTiming } from "react-native-reanimated";
import { interpolatePath, parse } from "react-native-redash";
import Svg, { Color, Path } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const NapAlarmIcon = ({ color }: { color: Color }): JSX.Element => {
	const { napIsAlarmOn } = useContext(RootContext);

	const transition = useDerivedValue(() => {
		return withTiming(napIsAlarmOn.value ? 0 : 1);
	}, [napIsAlarmOn]);
	
	const durationTransition = useDerivedValue(() => {
		return withTiming(napIsAlarmOn.value ? 0 : 1, { duration: napIsAlarmOn.value ? 0 : 1000 });
	}, [napIsAlarmOn]);
	
	const p1 = parse("M 25.5 0 l 2.3 2 -23.5 28 L 2 28 z");
	const p2 = parse("M 25.5 0 l 2.3 2 -0.6 0.8 L 24.9 0.8 z");

	const animatedProps = useAnimatedProps(() => {
		const d = interpolatePath(
			transition.value,
			[0, 1],
			[p1, p2]
		);
		const opacity = interpolate(
			durationTransition.value,
			[0, 1],
			[1, 0]
		);

		return {
			d,
			opacity,
		};
	});

	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M17.307 27.084c-.235.4-.571.733-.976.964a2.687 2.687 0 01-2.662 0 2.653 2.653 0 01-.976-.964M23 9.921c0-2.1-.843-4.115-2.343-5.6A8.04 8.04 0 0015 2a8.04 8.04 0 00-5.657 2.32A7.882 7.882 0 007 9.921c0 9.242-4 11.883-4 11.883h24s-4-2.641-4-11.883z"
					stroke={color}
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<AnimatedPath
					animatedProps={animatedProps}
					fill={color}
				/>
			</Svg>
		</View>
	);
};

export default NapAlarmIcon;
