import * as React from "react";
import { View } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const InfinityIcon = (): JSX.Element => {
	return (
		<View {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Rect width="100%" height="100%" rx={5} fill="#A4D54C" />
				<Path
					d="M15 15.556l5.318-2.894c1.533-.834 3.478-.451 4.537.894a3.207 3.207 0 010 4c-1.059 1.344-3.004 1.727-4.537.893L15 15.556zm0 0L9.68 12.662c-1.532-.834-3.477-.451-4.537.894a3.206 3.206 0 000 4c1.06 1.344 3.005 1.727 4.537.893L15 15.556z"
					stroke="#FDF5F1"
					strokeWidth={2}
				/>
			</Svg>
		</View>
	);
};

export default InfinityIcon;
