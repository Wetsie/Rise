import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Color, Path } from "react-native-svg";
import { iconSvgProps, iconViewProps } from "_styles/spacing";

const ModeSettingsIcon = ({ color, onPress }: { color: Color, onPress: () => void }): JSX.Element => {
	return (
		<Pressable hitSlop={20} onPress={onPress} {...iconViewProps}>
			<Svg {...iconSvgProps}>
				<Path
					d="M7 24v-7m0-4V6m8 18v-9m0-4V6m8 18v-5m0-4V6M4 17h6m2-6h6m2 8h6"
					stroke={color}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</Pressable>
	);
};

export default React.memo(ModeSettingsIcon);
