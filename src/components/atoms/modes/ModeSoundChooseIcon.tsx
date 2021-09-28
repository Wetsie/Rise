import * as React from "react";
import { View } from "react-native";
import Svg, { Color, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ModeSoundChooseIcon = ({ color }: { color: Color }): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M23.25 2H6.75C5.231 2 4 3.182 4 4.64v21.12c0 1.458 1.231 2.64 2.75 2.64h16.5c1.519 0 2.75-1.182 2.75-2.64V4.64C26 3.182 24.769 2 23.25 2z"
					stroke={color}
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M15 23.12c3.038 0 5.5-2.364 5.5-5.28 0-2.916-2.462-5.28-5.5-5.28s-5.5 2.364-5.5 5.28c0 2.916 2.462 5.28 5.5 5.28zM15 7.28h.014"
					stroke={color}
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ModeSoundChooseIcon;
