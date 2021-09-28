import * as React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { scaleSize } from "_styles/mixins";
import { SHOP_DOWNLOAD_ICONS_SIZE } from "_styles/spacing";

const ShopDownloadSvgCheckMark = (): JSX.Element => {
	const size = SHOP_DOWNLOAD_ICONS_SIZE;
    
	return (
		<View
			style={{
				aspectRatio: size / size,
				marginLeft: scaleSize(10),
				height: size,
			}}
		>
			<Svg width="100%" height="100%" viewBox="0 0 22 22" fill="none">
				<Path
					d="M6 11.044L9.438 15 16 8"
					stroke="#FDF5F1"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
					stroke="#FDF5F1"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
};

export default ShopDownloadSvgCheckMark;