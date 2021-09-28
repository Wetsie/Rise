import * as React from "react";
import { useContext } from "react";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import { WHITE } from "_styles/colors";
import { PROGRESS_BAR_SIZE as size } from "_styles/spacing";

const ACircle = Animated.createAnimatedComponent(Circle);

const NapProgressBar = (): JSX.Element => {
	const { timerCountdownProgress } = useContext(RootContext);
	
	const r = 104;
	const circumference = 2 * Math.PI * r;

	const props = useAnimatedProps(() => {
		const a = interpolate(
			timerCountdownProgress.value,
			[0, 1],
			[Math.PI * 2, 0]
		);

		return {
			strokeDashoffset: a * r
		};
	}, [timerCountdownProgress]);

	return (
		<View
			style={{
				aspectRatio: size / size,
				height: size,
				transform: [{
					rotate: "-90deg"
				}],
				position: "absolute",
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 230 230"
				fill="none"
			>
				<ACircle
					animatedProps={props}
					cx={115}
					cy={115}
					r={r}
					stroke={WHITE}
					strokeLinecap="round"
					strokeWidth={4}
					strokeDasharray={`${circumference}, ${circumference}`}
				/>
			</Svg>
		</View>
	);
};

export default NapProgressBar;