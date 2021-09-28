import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BLACK } from "_styles/colors";
import { scaleSize } from "_styles/mixins";

const SettingNavigateArrow = (): JSX.Element => {
	const width = scaleSize(6);
	const height = scaleSize(10);

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
				viewBox="0 0 6 10"
				fill="none"
			>
				<Path
					d="M1 1l4 4-4 4"
					stroke={BLACK}
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default SettingNavigateArrow;
