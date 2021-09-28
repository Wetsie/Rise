import * as React from "react";
import { View } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ProfileFocusIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Rect width="100%" height="100%" rx={5} fill="#DA5724" />
				<Path
					d="M16.43 7.565V5.857h.78a.928.928 0 000-1.857h-4.42a.928.928 0 000 1.857h.78v1.708c-4.436.69-7.842 4.536-7.842 9.162C5.728 21.84 9.888 26 15 26c5.113 0 9.273-4.16 9.273-9.273 0-4.626-3.407-8.472-7.843-9.162zM15 24.143c-4.09 0-7.416-3.326-7.416-7.416 0-4.089 3.327-7.415 7.416-7.415 4.09 0 7.416 3.326 7.416 7.415 0 4.09-3.327 7.416-7.416 7.416z"
					fill="#fff"
				/>
				<Path
					d="M15.928 16.342v-4.374a.928.928 0 00-1.856 0v4.91c0 .15.06.295.167.401l2.597 2.587a.928.928 0 001.31-1.316l-2.218-2.208z"
					fill="#fff"
				/>
			</Svg>
		</View>
	);
};

export default ProfileFocusIcon;
