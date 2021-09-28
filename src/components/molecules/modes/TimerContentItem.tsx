import React, { useContext } from "react";

import ModeSwipe from "./ModeSwipe";
import CustomText from "_components/atoms/CustomText";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import RootContext from "_components/context/RootContext";
import CountdownCurrentTime from "./CountdownCurrentTime";
import PomodoroCurrentTime from "./PomodoroCurrentTime";
import InfiniteCurrentTime from "./InfiniteCurrentTime";

const TimerContentItem = (): JSX.Element | null => {
	const { isTimerOn, activeModeIndex } = useContext(RootContext);
	const { swipeTextStyle, mode } = useContext(CreateModeScreenContext);

	if (isTimerOn) {
		if (mode === "meditation") {
			return null;
		}

		if (mode === "nap" || !activeModeIndex) {
			return <CountdownCurrentTime />;
		} else if (activeModeIndex === 1) {
			return <PomodoroCurrentTime />;
		}
		
		return <InfiniteCurrentTime />;
	}

	if (activeModeIndex === 2 && mode === "focus") {
		return <CustomText type="demi" style={swipeTextStyle}>00:00</CustomText>;
	}

	return <ModeSwipe />;
};

export default TimerContentItem;
