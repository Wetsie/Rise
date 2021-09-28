import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BLACK } from "_styles/colors";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ProfileNotificationsIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M17.518 25.379c-.205.34-.5.624-.853.82a2.4 2.4 0 01-2.33 0 2.294 2.294 0 01-.853-.82M22.5 10.75c0-1.79-.738-3.508-2.05-4.774A7.133 7.133 0 0015.5 4a7.133 7.133 0 00-4.95 1.977 6.632 6.632 0 00-2.05 4.774C8.5 18.628 5 20.878 5 20.878h21s-3.5-2.25-3.5-10.127z"
					stroke={BLACK}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ProfileNotificationsIcon;
