import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GRAY } from "_styles/colors";
import { scaleSize } from "_styles/mixins";

const SettingsNameChangeIcon = (): JSX.Element => {
	const size = scaleSize(15);
    
	return (
		<View
			style={{
				aspectRatio: size / size,
				height: size
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 15 15"
				fill="none"
			>
				<Path
					d="M7.3 14.198h6.3M10.45 1.48A1.42 1.42 0 0111.5 1c.195 0 .388.042.568.124.18.083.344.203.482.355.138.152.247.332.322.53a1.78 1.78 0 010 1.252 1.655 1.655 0 01-.322.53L3.8 13.429l-2.8.77.7-3.083 8.75-9.636z"
					stroke={GRAY}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default SettingsNameChangeIcon;
