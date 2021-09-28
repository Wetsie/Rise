import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Svg, { Path, Defs, Pattern, Rect } from "react-native-svg";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
	useAnimatedProps,
	useSharedValue,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	withSpring,
	useDerivedValue,
	runOnJS,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

import RootContext from "_components/context/RootContext";
import { DBLUE } from "_styles/colors";
import { setVolume } from "_utils/mmkv/MmkvSetFunctions";
import { scaleSize } from "_styles/mixins";
import { getBreathSoundVolume, getSoundVolumeWhenBreathIsOn } from "_utils/RootComponentUtils";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const { width } = Dimensions.get("screen");
const primaryColor = DBLUE;
const sliderY = scaleSize(14) * 2;
const knobSize = scaleSize(20);
const pathHeight = scaleSize(4);

const ReanimatedVolumeSlider = ({ padding, availableWidth, xPos: knobX }: {
	padding: number,
	availableWidth: number,
	xPos: Animated.SharedValue<number>
}): JSX.Element => {
	const { volume, sound, meditationBreathSounds, modeNavigation, breathSound } = useContext(RootContext);
	const pathType = "linear";

	const knobY = useSharedValue(sliderY);

	const path = useDerivedValue(() => {
		if (pathType === "linear") {
			let lX1 = knobX.value - knobSize / 2;
			const lY1 = knobY.value;
			if (lX1 < padding) {
				lX1 = padding;
			}

			let lX2 = knobX.value + knobSize / 2;
			if (lX2 > availableWidth + padding) {
				lX2 = availableWidth + padding;
			}

			const lY2 = knobY.value;

			return `M ${padding} ${sliderY} L ${lX1} ${lY1} L ${lX2} ${lY2} L ${
				availableWidth + padding
			} ${sliderY}`;
		}
	}, [pathType]);

	const pathProps = useAnimatedProps(() => {
		return {
			d: path.value,
		};
	});

	const knobStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: knobX.value - knobSize / 2 },
				{ translateY: knobY.value - knobSize / 2 },
			],
		};
	});

	const percentage = useDerivedValue(() => {
		return Math.round((((knobX.value - padding) / availableWidth) + Number.EPSILON) * 100) / 100;
	});

	const onGestureFinish = async (soundValueToSave: number) => {
		setVolume({ value: soundValueToSave });
		try {
			if (modeNavigation.value === "meditation" && !meditationBreathSounds.value) {
				await sound.setVolumeAsync(getSoundVolumeWhenBreathIsOn(volume));
				await breathSound.setVolumeAsync(getBreathSoundVolume(volume));
			} else {
				await sound.setVolumeAsync(soundValueToSave);
			}
		} catch {
			null;
		}
	}; 

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, ctx: { offsetX: number, offsetY: number }) => {
			ctx.offsetX = knobX.value;
			ctx.offsetY = knobY.value;
		},
		onActive: (event, ctx) => {
			let nextX = ctx.offsetX + event.translationX;
			if (nextX < padding) {
				nextX = padding;
			} else if (nextX > availableWidth + padding) {
				nextX = availableWidth + padding;
			}

			knobX.value = nextX;
			knobY.value = clamp(
				ctx.offsetY + event.translationY,
				sliderY / 4,
				sliderY * 2,
			);

			volume.value = percentage.value;
			runOnJS(onGestureFinish)(volume.value);
		},
		onEnd: () => {
			knobY.value = withSpring(sliderY, {
				damping: 3,
				stiffness: 150,
				mass: 0.2,
			});
		},

		onFinish: () => {
			volume.value = percentage.value;
			runOnJS(onGestureFinish)(volume.value);
		}
	});

	const rect1Props = useAnimatedProps(() => {
		let x = knobX.value - availableWidth - knobSize / 2;

		if (knobX.value <= padding * 2) {
			x += 20;
		}

		return {
			x,
		};
	});

	const rect2Props = useAnimatedProps(() => {
		let x = knobX.value + knobSize / 2;

		if (knobX.value >= availableWidth - padding * 2) {
			x -= 20;
		}
		return {
			x,
		};
	});

	return (
		<View style={[styles.container, { marginLeft: padding / 2 }]}>
			<Svg>
				<Defs>
					<Pattern
						id="pattern"
						width={width}
						height={pathHeight}
						patternUnits="userSpaceOnUse">
						<AnimatedRect
							animatedProps={rect1Props}
							width={availableWidth}
							height={pathHeight}
							fill={primaryColor}
						/>
						<AnimatedRect
							animatedProps={rect2Props}
							width={availableWidth}
							height={pathHeight}
							fill="rgba(172, 172, 172, 0.38)"
						/>
					</Pattern>
				</Defs>
				<AnimatedPath
					animatedProps={pathProps}
					stroke="url(#pattern)"
					strokeWidth={pathHeight}
					strokeLinecap="round"
				/>
			</Svg>
			<PanGestureHandler hitSlop={20} {...{ onGestureEvent }}>
				<Animated.View style={[styles.knob, knobStyle]} />
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: knobSize * 3,
		transform: [{
			translateY: scaleSize(2),
		}]
	},

	knob: {
		position: "absolute",
		backgroundColor: primaryColor,
		width: knobSize,
		height: knobSize,
		borderRadius: knobSize / 2,
	},
});

export default ReanimatedVolumeSlider;