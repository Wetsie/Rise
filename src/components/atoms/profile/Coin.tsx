import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { YELLOW } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { CONTENT_PADDING } from "_styles/spacing";

const Coin = (): JSX.Element => {
	return (
		<View
			style={{
				marginLeft: CONTENT_PADDING / 2,
				aspectRatio: scaleSize(10) / scaleSize(10),
				height: scaleSize(10),
			}}
		>
			<Svg width="100%" height="100%" viewBox="0 0 10 10" fill="none">
				<Circle cx="5" cy="5" r="5" fill={YELLOW}/>
			</Svg>
		</View>
	);
};

export default Coin;
