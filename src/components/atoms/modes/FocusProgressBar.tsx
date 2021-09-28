import * as React from "react";
import { useContext } from "react";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import { DBLUE } from "_styles/colors";
import { PROGRESS_BAR_SIZE as size } from "_styles/spacing";

const ACircle = Animated.createAnimatedComponent(Circle);

const FocusProgressBar = (): JSX.Element => {
	const {
		timerCountdownProgress,
		isTimerOn,
		activeModeIndex,
		timerPomodoroProgress,
	} = useContext(RootContext);
	
	const r = 110;
	const circumference = 2 * Math.PI * r;

	const props = useAnimatedProps(() => {
		const a = interpolate(
			activeModeIndex === 2 ? // if a stopwatch is selected, then in the on state the progress will be filled
				(
					isTimerOn ?
						1 :
						0
				) :
				(
					activeModeIndex === 1 ? // count pomodoro progress if it is selected as a mode
						timerPomodoroProgress.value :
						timerCountdownProgress.value
				),
			[0, 1],
			[Math.PI * 2, 0]
		);

		return {
			strokeDashoffset: a * r
		};
	}, [activeModeIndex, isTimerOn]);

	return (
		<View
			style={{
				aspectRatio: size / size,
				height: size,
				transform: [{
					rotate: "-90deg"
				}]
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 230 230"
				fill="none"
			>
				<Circle
					cx={115}
					cy={115}
					r={r}
					stroke="#ECF7F9"
					strokeLinecap="round"
					strokeWidth={10}
				/>
				<ACircle
					animatedProps={props}
					cx={115}
					cy={115}
					r={r}
					stroke={DBLUE}
					strokeLinecap="round"
					strokeWidth={10}
					strokeDasharray={`${circumference}, ${circumference}`}
				/>
			</Svg>
		</View>
	);
};

export default FocusProgressBar;