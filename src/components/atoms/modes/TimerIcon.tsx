import * as React from "react";
import { View } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const TimerIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Rect width="100%" height="100%" rx={5} fill="#0564F2" />
				<Path
					d="M15.217 24.746a9.444 9.444 0 100-18.889 9.444 9.444 0 000 18.89z"
					stroke="#FDF5F1"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M15.217 9.635v5.667l3.778 1.889"
					stroke="#FDF5F1"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default TimerIcon;
