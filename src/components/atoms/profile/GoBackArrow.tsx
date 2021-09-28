import * as React from "react";
import { View } from "react-native";
import Svg, { Color, Path } from "react-native-svg";
import { scaleSize } from "_styles/mixins";

const GoBackArrow = ({ opacity, color }: { opacity?: number, color: Color }): JSX.Element => {
	const height = scaleSize(14);
	const width = scaleSize(8);

	return (
		<View
			style={{
				aspectRatio: width / height,
				opacity: opacity ?? 1,
				height,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 8 14"
				fill="none"
			>
				<Path
					d="M7 13L1 7l6-6"
					stroke={color}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default GoBackArrow;
