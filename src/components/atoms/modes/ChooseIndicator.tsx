import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { scaleSize } from "_styles/mixins";

const ChooseIndicator = (): JSX.Element => {
	const width = scaleSize(15);
	const height = scaleSize(12);

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
				viewBox="0 0 15 12"
				fill="none"
			>
				<Path
					d="M1.112 5.253l4.125 5.087 7.875-9"
					stroke="#343434"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ChooseIndicator;
