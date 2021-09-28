import * as React from "react";
import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Svg, { Circle } from "react-native-svg";
import { GRAY } from "_styles/colors";
import { TOGGLE_CIRCLE_SIZE } from "_styles/spacing";

const ToggleCircle = (): JSX.Element => {
	return (
		<Shadow
			startColor={GRAY + "20"}
			finalColor={GRAY + "00"}
			radius={12}
			distance={5}
		>
			<View
				style={{
					aspectRatio: TOGGLE_CIRCLE_SIZE / TOGGLE_CIRCLE_SIZE,
					height: TOGGLE_CIRCLE_SIZE,
				}}
			>
				<Svg
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
				>
					<Circle
						cx={12}
						cy={12}
						r={12}
						fill="#FDF5F1"
					/>
				</Svg>
			</View>
		</Shadow>
	);
};

export default ToggleCircle;
