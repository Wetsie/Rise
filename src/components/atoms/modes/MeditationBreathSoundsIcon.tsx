import * as React from "react";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedProps, useDerivedValue, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const MeditationBreathSoundsIcon = (): JSX.Element => {
	const { meditationBreathSounds } = React.useContext(RootContext);

	const transition = useDerivedValue(() => {
		return withTiming(meditationBreathSounds.value ? 0 : 1);
	}, [meditationBreathSounds]);
	
	const durationTransition = useDerivedValue(() => {
		return withTiming(meditationBreathSounds.value ? 0 : 1, { duration: meditationBreathSounds.value ? 0 : 1000 });
	}, [meditationBreathSounds]);

	const animatedProps = useAnimatedProps(() => {
		const rotation = interpolate(
			transition.value,
			[0, 1],
			[8, 0]
		);
		const length = interpolate(
			transition.value,
			[0, 1],
			[29.467, 0]
		);
		const opacity = interpolate(
			durationTransition.value,
			[0, 1],
			[1, 0]
		);

		const d = `M4 0.776 L 7 0 l ${rotation} ${length} -3 1 z`;

		return {
			d,
			opacity,
		};
	});

	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M12.954 4.122a2.42 2.42 0 011.264-.069c.42.09.813.29 1.145.583.331.292.59.669.754 1.095a3 3 0 01-.245 2.633 2.68 2.68 0 01-.94.914c-.379.216-.8.328-1.23.326H2m14.854 16.69c.41.135.844.158 1.265.069.42-.09.813-.29 1.145-.582.33-.293.59-.67.754-1.096a2.999 2.999 0 00-.245-2.633 2.68 2.68 0 00-.94-.913 2.453 2.453 0 00-1.23-.327H2M22.454 9.226a3.214 3.214 0 011.354-.873 3.026 3.026 0 011.577-.082 3.156 3.156 0 011.427.727c.413.365.736.835.94 1.366a3.748 3.748 0 01-.298 3.284 3.352 3.352 0 01-1.168 1.144c-.471.272-.997.415-1.53.416H2"
					stroke="#ACACAC"
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<AnimatedPath
					animatedProps={animatedProps}
					fill="#ACACAC"
				/>
			</Svg>
		</View>
	);
};

export default MeditationBreathSoundsIcon;
