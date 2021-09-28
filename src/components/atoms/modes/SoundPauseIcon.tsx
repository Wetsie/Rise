import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { scaleSize } from "_styles/mixins";

const SoundPauseIcon = (): JSX.Element => {
	const width = scaleSize(14);
	const height = scaleSize(16);

	return (
		<View
			style={{
				aspectRatio: width / height,
				position: "absolute",
				height,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 14 16"
				fill="none"
			>
				<Path
					d="M2 14V2M12 14V2"
					stroke="#FDF5F1"
					strokeWidth={4}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default SoundPauseIcon;
