import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { scaleSize } from "_styles/mixins";

const MeditationAnimatedBall = (): JSX.Element => {
	const width = scaleSize(196);
	const height = scaleSize(188);

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
				viewBox="0 0 196 188"
				fill="none"
			>
				<Path
					d="M194.854 99.881C187.32 138.368 150.913 188 100.751 188 50.59 188 0 161.423 0 99.881 0 13.627 57.957.001 92.431.001c80.835 0 109.958 61.393 102.423 99.88z"
					fill="#0564F2"
				/>
			</Svg>
		</View>
	);
};

export default MeditationAnimatedBall;
