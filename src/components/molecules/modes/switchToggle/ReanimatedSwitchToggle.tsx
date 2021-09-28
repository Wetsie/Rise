import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated,
{
	interpolateColor,
	useAnimatedProps,
	useAnimatedStyle,
	useDerivedValue,
	withTiming
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import CreateSvgView from "_components/molecules/create/CreateSvgView";
import { DBLUE, GRAY } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { TOGGLE_CIRCLE_SIZE } from "_styles/spacing";
import ToggleCircle from "./ToggleCircle";

const TOTAL_WIDTH = scaleSize(44);
const BACK_WIDTH = scaleSize(32);
const BACK_HEIGHT = scaleSize(18);
const TRANSLATE_WIDTH = scaleSize(BACK_WIDTH - TOGGLE_CIRCLE_SIZE / 2 - 2);

const ReanimatedSwitchToggle = ({ disabled, setFunc, animValue }: {
	disabled: boolean,
	animValue: Animated.SharedValue<boolean>,
	setFunc: (value: boolean) => void
}): JSX.Element => {
	const transition = useDerivedValue(() => {
		return withTiming(animValue.value ? 1 : 0, { duration: 250 });
	}, [animValue]);

	const style = useAnimatedStyle(() => {
		return {
			transform: [{
				translateX: mix(transition.value, 0, -TRANSLATE_WIDTH)
			}]
		};
	}, [transition]);

	const backStyle = useAnimatedProps(() => {
		return {
			fill: interpolateColor(
				transition.value,
				[0, 1],
				[DBLUE, GRAY]
			)
		};
	}, [transition]);

	const onPress = () => {
		animValue.value = !animValue.value;
		setFunc(!animValue.value);
	};

	return (
		<Pressable disabled={disabled} onPress={onPress} style={styles.mainContainer}>
			<View style={styles.svgView}>
				<CreateSvgView
					width={BACK_WIDTH}
					height={BACK_HEIGHT}
					animatedProps={backStyle}
					color={DBLUE}
					radius={9}
				/>
			</View>
			<Animated.View style={style}>
				<ToggleCircle />
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		width: TOTAL_WIDTH,
	},

	svgView: {
		width: TOTAL_WIDTH,
		position: "absolute",
		alignItems: "center",
	}
});

export default ReanimatedSwitchToggle;
