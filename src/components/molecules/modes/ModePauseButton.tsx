import I18n from "i18n-js";
import React, { useEffect, useContext } from "react";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { mix } from "react-native-redash";
import RootContext from "_components/context/RootContext";

import { DBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { CONTENT_PADDING } from "_styles/spacing";
import { DEFAULT_ANIMATION_DUR } from "_utils/Animations";
import CreateModeButton from "../create/CreateModeButton";

const width = scaleSize(120);

const ModePauseButton = ({ onPress }: {
	onPress: () => void
}): JSX.Element => {
	const { isTimerPaused, isTimerOn } = useContext(RootContext);
	const pause = I18n.t("modePauseButton");
	const resume = I18n.t("modeResumeButton");

	const isAnimationToggled = useSharedValue(0);
	const transition = useDerivedValue(() => {
		return withTiming(isAnimationToggled.value, { duration: DEFAULT_ANIMATION_DUR });
	});

	const rightButtonStyle = useAnimatedStyle(() => {
		return {
			marginHorizontal: width / 2 + CONTENT_PADDING / 2,
			position: "absolute",
			transform: [{
				translateX: mix(transition.value, 0, -(width / 2 + CONTENT_PADDING / 2)),
			}]
		};
	});

	useEffect(() => {
		isAnimationToggled.value = isTimerOn ? 1 : 0;
	}, [isTimerOn]);

	const text = useDerivedValue(() => {
		return isTimerPaused.value ? resume : pause;
	});

	return (
		<Animated.View style={rightButtonStyle}>
			<CreateModeButton
				containerStyle={{
					marginRight: CONTENT_PADDING,
				}}
				width={width}
				onPress={onPress}
				color={DBLUE}
				textColor={WHITE}
				text={text}
			/>
		</Animated.View>
	);
};

export default ModePauseButton;
