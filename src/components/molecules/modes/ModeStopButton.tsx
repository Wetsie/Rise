import React, { useContext, useEffect } from "react";
import I18n from "i18n-js";
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";

import { scaleSize } from "_styles/mixins";
import CreateModeButton from "../create/CreateModeButton";
import { mix } from "react-native-redash";
import { CONTENT_PADDING } from "_styles/spacing";
import RootContext from "_components/context/RootContext";
import { DEFAULT_ANIMATION_DUR } from "_utils/Animations";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";

const width = scaleSize(120);

const ModeStopButton = ({ onPress, colors }: {
	onPress: () => void,
	colors: {
		endButtonColor: string;
		endButtonTextColor: string;
	}
}): JSX.Element => {
	const { mode } = useContext(CreateModeScreenContext);
	const { isTimerOn } = useContext(RootContext);

	const stop = I18n.t("modeStopButton");
	const text = useSharedValue(stop);

	const isAnimationToggled = useSharedValue(0);
	const transition = useDerivedValue(() => {
		return withTiming(isAnimationToggled.value, { duration: DEFAULT_ANIMATION_DUR });
	});

	const leftButtonStyle = useAnimatedStyle(() => {
		return {
			marginHorizontal: width / 2 + CONTENT_PADDING / 2,
			transform: [{
				translateX: mix(transition.value, 0, width / 2 + CONTENT_PADDING / 2),
			}]
		};
	});

	useEffect(() => {
		if (mode === "focus") {
			isAnimationToggled.value = isTimerOn ? 1 : 0;
		}
	}, [isTimerOn]);

	return (
		<Animated.View style={leftButtonStyle}>
			<CreateModeButton
				onPress={onPress}
				width={width}
				color={colors.endButtonColor}
				textColor={colors.endButtonTextColor}
				text={text}
			/>
		</Animated.View>
	);
};

export default ModeStopButton;
