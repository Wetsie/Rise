import * as React from "react";
import { View } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const PomodoroIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Rect width="100%" height="100%" rx={5} fill="#DA5724" />
				<Path
					d="M23.674 16.378c0 4.478-3.793 8.177-8.56 8.177-4.765 0-8.559-3.699-8.559-8.177s3.794-8.177 8.56-8.177 8.56 3.7 8.56 8.177z"
					stroke="#FDF5F1"
					strokeWidth={2}
				/>
				<Path
					d="M12.418 9.496c2.336 0 2.758-1.53 2.677-2.295h-3.408c-2.41 0-3.052 1.53-3.072 2.295h3.803z"
					stroke="#FDF5F1"
					strokeWidth={2}
				/>
				<Path
					d="M17.812 9.496c-2.337 0-2.758-1.53-2.677-2.295h3.407c2.41 0 3.053 1.53 3.073 2.295h-3.803zM14.732 7.202V3.378"
					stroke="#FDF5F1"
					strokeWidth={2}
				/>
			</Svg>
		</View>
	);
};

export default PomodoroIcon;
