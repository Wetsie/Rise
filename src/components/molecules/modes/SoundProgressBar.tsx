import * as React from "react";
import { View } from "react-native";
import Animated, { useAnimatedProps, useDerivedValue, withTiming } from "react-native-reanimated";
import { mix } from "react-native-redash";
import Svg, { Rect } from "react-native-svg";
import { DBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";

const ARect = Animated.createAnimatedComponent(Rect);

const SoundProgressBar = ({ progress }: { progress: number }): JSX.Element => {
	const width = scaleSize(100);
	const height = scaleSize(10);

	const transition = useDerivedValue(() => {
		return withTiming(progress, { duration: 100 });
	}, [progress]);

	const aProps = useAnimatedProps(() => {
		return {
			width: mix(transition.value, 0, 100),
		};
	});

	return (
		<View
			style={{
				aspectRatio: width / height,
				height,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox={"0 0 " + width + " " + height}
				fill="none"
			>
				<Rect
					width="100%"
					height="100%"
					rx={5}
					fill={WHITE}
				/>
				<ARect
					animatedProps={aProps}
					height="100%"
					rx={5}
					fill={DBLUE}
				/>
			</Svg>
		</View>
	);
};

export default SoundProgressBar;
