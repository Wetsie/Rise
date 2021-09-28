import * as React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Color, Rect, RectProps } from "react-native-svg";

const ARect = Animated.createAnimatedComponent(Rect);

const CreateSvgView = ({ height, width, color, radius, opacity, animatedProps }: {
	height: number,
	width: number,
	color: Color,
	radius?: number,
	opacity?: number,
	animatedProps?: Partial<Animated.AnimateProps<RectProps>>
}): JSX.Element => {
	if (animatedProps) {
		return (
			<Animated.View
				style={{
					aspectRatio: width / height,
					height,
					opacity,
				}}
			>
				<Svg
					width="100%"
					height="100%"
					viewBox={"0 0 " + width + " " + height}
					fill="none"
				>
					<ARect animatedProps={animatedProps} width="100%" height="100%" rx={radius ?? 15} />
				</Svg>
			</Animated.View>
		);
	}

	return (
		<View
			style={{
				aspectRatio: width / height,
				height,
				opacity,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox={"0 0 " + width + " " + height}
				fill="none"
			>
				<Rect width="100%" height="100%" rx={radius ?? 15} fill={color} />
			</Svg>
		</View>
	);
};

export default React.memo(CreateSvgView);
