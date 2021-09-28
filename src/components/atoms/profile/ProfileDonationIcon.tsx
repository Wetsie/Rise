import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { DBLUE } from "_styles/colors";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ProfileDonationIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M21.524 11.1h1.095c1.162 0 2.276.548 3.098 1.523.821.975 1.283 2.298 1.283 3.677 0 1.38-.462 2.702-1.283 3.677-.822.975-1.936 1.523-3.098 1.523h-1.095m0-10.4H4v11.7c0 1.38.462 2.702 1.283 3.677C6.105 27.452 7.22 28 8.381 28h8.762c1.162 0 2.276-.548 3.098-1.523.821-.975 1.283-2.298 1.283-3.677V11.1zM8.38 2v3.9m4.38-3.9v3.9M17.144 2v3.9"
					stroke={DBLUE}
					strokeWidth={3}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ProfileDonationIcon;
