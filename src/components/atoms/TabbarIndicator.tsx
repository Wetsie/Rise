import * as React from "react";
import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { SCALE_4 } from "_styles/spacing";

const Line = (): JSX.Element => {
	return (
		<View
			style={{
				aspectRatio: 10 / 4,
				height: SCALE_4,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 10 4"
				fill="none"
			>
				<Rect width="100%" height="100%" rx={2} fill="#0564F2" />
			</Svg>
		</View>
	);
};

export default Line;
