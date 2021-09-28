import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ModePlayIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M10.288 21.415a.568.568 0 01-.568-.568V8.363a.567.567 0 01.841-.497l11.349 6.242a.567.567 0 010 .994L10.56 21.344a.569.569 0 01-.273.07z"
					fill="#fff"
				/>
				<Circle cx={15} cy={15} r={14.5} stroke="#fff" />
			</Svg>
		</View>
	);
};

export default ModePlayIcon;
