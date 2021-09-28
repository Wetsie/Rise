/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix, ReText } from "react-native-redash";
import Svg, { Path } from "react-native-svg";

import RootContext from "_components/context/RootContext";
import { DBLUE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_30 } from "_styles/typography";
import AnimatedOpacityView from "_components/molecules/create/CreateAnimatedOpacityView";

const MeditationProgressBall = (): JSX.Element => {
	const { meditationProgress, isTimerOn, meditationMode } = React.useContext(RootContext);
	const width = scaleSize(196);
	const height = scaleSize(188);

	const style = useAnimatedStyle(() => {
		return {
			transform: [{
				scale: mix(meditationProgress.value, 0.9, 1.1)
			}]
		};
	});

	return (
		<Animated.View
			style={[{
				alignItems: "center",
				justifyContent: "center",
				aspectRatio: width / height,
				height,
			}, style]}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 196 188"
				fill="none"
			>
				<Path
					d="M193.904 99.694c-3.627 19.055-14.22 40.916-29.958 58.002C148.212 174.776 127.419 187 103.393 187c-24.24 0-49.871-6.091-69.412-19.761C14.48 153.598 1 132.386 1 101.96c0-42.857 15.332-68.03 34.682-82.525C55.084 4.902 78.669 1 95.302 1c77.924 0 105.818 60.78 98.602 98.694z"
					stroke="#0564F2"
					strokeWidth={2}
				/>
			</Svg>
			<View style={styles.textView}>
				<AnimatedOpacityView animationValue={isTimerOn}>
					<ReText
						text={meditationMode}
						style={styles.text}
					/>
				</AnimatedOpacityView>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "FuturaPT-Medium",
		justifyContent: "center",
		fontSize: FONT_SIZE_30,
		color: DBLUE,
	},

	textView: {
		position: "absolute",
	}
});

export default MeditationProgressBall;
