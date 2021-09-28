import React, { useContext } from "react";
import { interpolate, useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import RootContext from "_components/context/RootContext";
import AnimatedOpacityView from "../create/CreateAnimatedOpacityView";

const PomodoroCurrentTime = (): JSX.Element => {
	const {
		isTimerOn,
		timerPomodoroProgress,
		pomodoroMinutes,
	} = useContext(RootContext);
	const { swipeTextStyle } = useContext(CreateModeScreenContext);

	const timeToCalculate = useDerivedValue(() => {
		return Math.ceil(
			interpolate(
				timerPomodoroProgress.value,
				[0, 1],
				[pomodoroMinutes.value, 0]
			)
		);
	});

	const mins = useDerivedValue(() => {
		const temp = Math.floor(timeToCalculate.value / 60);

		return temp < 10 ? "0" + temp : JSON.stringify(temp);
	});

	const secs = useDerivedValue(() => {
		const temp = timeToCalculate.value - parseInt(mins.value, 10) * 60;

		return temp < 10 ? "0" + temp : temp;
	});

	const timeToShow = useDerivedValue(() => {
		return mins.value + ":" + secs.value;
	});

	return (
		<AnimatedOpacityView animationValue={isTimerOn}>
			<ReText text={timeToShow} style={[swipeTextStyle, { fontFamily: "FuturaPT-Demi" }]} />
		</AnimatedOpacityView>
	);
};

export default PomodoroCurrentTime;
