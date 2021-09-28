import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const FocusModeChooseIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M16.85 5.537V3.363h1.01c.663 0 1.2-.529 1.2-1.181 0-.653-.537-1.182-1.2-1.182h-5.72c-.663 0-1.2.529-1.2 1.182 0 .652.537 1.181 1.2 1.181h1.01v2.174C7.408 6.415 3 11.31 3 17.2 3 23.706 8.383 29 15 29s12-5.294 12-11.802c0-5.888-4.408-10.783-10.15-11.66zM15 26.637c-5.292 0-9.597-4.234-9.597-9.438 0-5.205 4.305-9.439 9.597-9.439s9.597 4.234 9.597 9.439c0 5.204-4.305 9.438-9.597 9.438z"
					fill="#ACACAC"
				/>
				<Path
					d="M16.201 16.708V11.14c0-.652-.538-1.181-1.201-1.181-.664 0-1.201.529-1.201 1.181v6.248c0 .192.077.377.216.512l3.36 3.292c.471.46 1.232.458 1.7-.004a1.168 1.168 0 00-.004-1.67l-2.87-2.811z"
					fill="#ACACAC"
				/>
			</Svg>
		</View>
	);
};

export default FocusModeChooseIcon;