import * as React from "react";
import { useContext } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import RootContext from "_components/context/RootContext";
import ExtraDimensions from "react-native-extra-dimensions-android";

const { width } = Dimensions.get("window");
const height = ExtraDimensions.getRealWindowHeight();

const NapBackgroundGradient = (): JSX.Element | null => {
	const { isTimerOn } = useContext(RootContext);

	if (isTimerOn) {
		return (
			<View
				style={{
					aspectRatio: width / height,
					position: "absolute",
					height,
				}}
			>
				<Svg
					width="100%"
					height="100%"
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
				>
					<Path fill="#082756" d={`M0 0h${width}v${height}H0z`} />
					<Path fill="url(#prefix__paint0_linear)" d={`M0 0h${width}v${height}H0z`} />
					<Defs>
						<LinearGradient
							id="prefix__paint0_linear"
							x1={180}
							y1={0}
							x2={180}
							y2={549.5}
							gradientUnits="userSpaceOnUse"
						>
							<Stop stopColor="#082756" />
							<Stop offset={0.286} stopColor="#0A2753" stopOpacity={0.714} />
							<Stop offset={0.578} stopColor="#071427" stopOpacity={0.422} />
							<Stop offset={0.818} stopColor="#1E3E6D" stopOpacity={0.182} />
							<Stop offset={1} stopColor="#082756" stopOpacity={0} />
						</LinearGradient>
					</Defs>
				</Svg>
			</View>
		);
	} else {
		return null;
	}
};

export default NapBackgroundGradient;
