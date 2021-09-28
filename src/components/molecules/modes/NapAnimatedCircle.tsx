import React, { useContext } from "react";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { Circle, CircleProps } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import { WHITE } from "_styles/colors";

const ACircle = Animated.createAnimatedComponent(Circle);
interface ACircleType {
    progressValueToEqual: number,
}

const NapAnimatedCircle = (props: ACircleType & CircleProps): JSX.Element => {
	const { timerCountdownProgress, isTimerOn } = useContext(RootContext);
	const { cx, cy, progressValueToEqual } = props;

	const animOpacity = useSharedValue(timerCountdownProgress.value >= progressValueToEqual ? 1 : 0.28);

	const circleStyle = useAnimatedProps(() => {
		if (Math.abs(timerCountdownProgress.value - progressValueToEqual) <= 0.003 && isTimerOn) {
			animOpacity.value = 1;
		} else if (!isTimerOn) {
			animOpacity.value = 0.40;
		}

		return {
			opacity: animOpacity.value,
		};
	});

	return (
		<ACircle animatedProps={circleStyle} cx={cx} cy={cy} r={10} fill={WHITE} />
	);
};

export default NapAnimatedCircle;
