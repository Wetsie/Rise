import * as React from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import NapAnimatedCircle from "_components/molecules/modes/NapAnimatedCircle";
import NapProgressBar from "_components/molecules/modes/NapProgressBar";
import { scaleSize } from "_styles/mixins";

const NapTimerWrapper = (): JSX.Element => {
	const width = scaleSize(230);
	const height = scaleSize(230);

	return (
		<View>
			<View
				style={{
					aspectRatio: width / height,
					height,
					transform: [{
						rotate: "90deg"
					}]
				}}
			>
				<Svg
					width="100%"
					height="100%"
					viewBox="0 0 230 214"
					fill="none"
				>
					<NapAnimatedCircle progressValueToEqual={0} cx={10} cy={107} />
					<NapAnimatedCircle progressValueToEqual={0.079} cx={27} cy={50} />
					<NapAnimatedCircle progressValueToEqual={0.178} cx={76} cy={10} />
					<NapAnimatedCircle progressValueToEqual={0.3} cx={155} cy={10} />
					<NapAnimatedCircle progressValueToEqual={0.398} cx={204} cy={50} />
					<NapAnimatedCircle progressValueToEqual={0.488} cx={220} cy={107} />
					<NapAnimatedCircle progressValueToEqual={0.578} cx={204} cy={164} />
					<NapAnimatedCircle progressValueToEqual={0.675} cx={155} cy={204} />
					<NapAnimatedCircle progressValueToEqual={0.798} cx={76} cy={204} />
					<NapAnimatedCircle progressValueToEqual={0.896} cx={27} cy={164} />
				</Svg>
			</View>
			<NapProgressBar />
		</View>
	);
};

export default NapTimerWrapper;
