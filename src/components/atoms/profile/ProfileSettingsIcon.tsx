import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BLACK } from "_styles/colors";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ProfileSettingsIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M15.5 17.5a3 3 0 100-6 3 3 0 000 6z"
					stroke={BLACK}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M22.564 17.364a1.576 1.576 0 00.315 1.737l.057.057a1.909 1.909 0 11-2.701 2.701l-.058-.057a1.574 1.574 0 00-1.737-.315 1.575 1.575 0 00-.955 1.442v.162a1.91 1.91 0 01-3.818 0v-.086a1.575 1.575 0 00-1.03-1.441 1.576 1.576 0 00-1.738.315l-.057.057a1.909 1.909 0 11-2.702-2.701l.058-.058a1.575 1.575 0 00.315-1.737 1.575 1.575 0 00-1.442-.955H6.91a1.91 1.91 0 010-3.818h.086a1.575 1.575 0 001.441-1.03 1.575 1.575 0 00-.315-1.738l-.057-.057a1.91 1.91 0 112.701-2.702l.058.058a1.575 1.575 0 001.737.315h.076a1.575 1.575 0 00.955-1.442V5.91a1.909 1.909 0 113.818 0v.086a1.575 1.575 0 00.955 1.441 1.575 1.575 0 001.737-.315l.057-.057a1.909 1.909 0 013.261 1.35 1.909 1.909 0 01-.56 1.351l-.057.058a1.574 1.574 0 00-.315 1.737v.076a1.575 1.575 0 001.442.955h.162a1.909 1.909 0 110 3.818h-.086a1.575 1.575 0 00-1.441.955z"
					stroke={BLACK}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ProfileSettingsIcon;
