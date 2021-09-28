import React, { useContext } from "react";
import { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import RootContext from "_components/context/RootContext";
import AnimatedOpacityView from "../create/CreateAnimatedOpacityView";

const InfiniteCurrentTime = (): JSX.Element => {
	const {
		isTimerOn,
		infiniteTime,
	} = useContext(RootContext);
	const { swipeTextStyle } = useContext(CreateModeScreenContext);

	const mins = useDerivedValue(() => {
		const temp = Math.floor(infiniteTime.value / 60);

		return temp < 10 ? "0" + temp : JSON.stringify(temp);
	});

	const secs = useDerivedValue(() => {
		const temp = infiniteTime.value - parseInt(mins.value, 10) * 60;

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

export default InfiniteCurrentTime;
