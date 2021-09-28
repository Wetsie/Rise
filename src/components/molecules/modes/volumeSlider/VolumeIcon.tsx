import * as React from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";
import { CONTENT_PADDING, iconSvgProps, MAIN_ICON_SIZE } from "_styles/spacing";

const APath = Animated.createAnimatedComponent(Path);
const ARect = Animated.createAnimatedComponent(Rect);
const padding = CONTENT_PADDING * 4;
const availableWidth = Dimensions.get("window").width - padding * 2;

const VolumeIcon = ({ xPos }: { xPos: Animated.SharedValue<number> }): JSX.Element => {
	const beginning = 0 * availableWidth + padding;
	const middle = 0.5 * availableWidth + padding;
	
	const path1 = useAnimatedProps(() => {
		return {
			opacity: xPos.value <= middle ? 0 : 1,
		};
	}, [xPos]);

	const path2 = useAnimatedProps(() => {
		return {
			opacity: xPos.value === beginning ? 0 : 1,
		};
	}, [xPos]);

	const rect1 = useAnimatedProps(() => {
		return {
			opacity: xPos.value === beginning ? 1 : 0,
		};
	}, [xPos]);

	const rect2 = useAnimatedProps(() => {
		return {
			opacity: xPos.value === beginning ? 1 : 0,
		};
	}, [xPos]);

	return (
		<Animated.View
			style={{
				aspectRatio: MAIN_ICON_SIZE / MAIN_ICON_SIZE,
				height: MAIN_ICON_SIZE,
				marginLeft: CONTENT_PADDING * 2,
				position: "absolute",
			}}
		>
			<Svg {...iconSvgProps}>
				<APath
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.9541 3.43165C23.8122 3.29174 23.6437 3.18151 23.4587 3.10744C23.2736 3.03336 23.0757 2.99691 22.8764 3.00021C22.6771 3.00351 22.4804 3.04649 22.2979 3.12666C22.1154 3.20682 21.9507 3.32255 21.8135 3.4671C21.6762 3.61164 21.5691 3.78208 21.4985 3.96848C21.4278 4.15487 21.3951 4.35348 21.402 4.55268C21.409 4.75189 21.4557 4.9477 21.5392 5.1287C21.6227 5.30968 21.7415 5.4722 21.8885 5.60677C27.3713 10.815 27.3713 19.2245 21.8885 24.4328C21.7415 24.5673 21.6227 24.7298 21.5392 24.9108C21.4557 25.0918 21.409 25.2876 21.402 25.4868C21.3951 25.686 21.4278 25.8846 21.4985 26.071C21.5691 26.2574 21.6762 26.4279 21.8135 26.5724C21.9507 26.717 22.1154 26.8327 22.2979 26.9129C22.4804 26.993 22.6771 27.036 22.8764 27.0394C23.0757 27.0426 23.2736 27.0061 23.4587 26.9321C23.6437 26.858 23.8122 26.7477 23.9541 26.6079C30.682 20.2176 30.682 9.82199 23.9541 3.43165Z"
					fill="#ACACAC"
					animatedProps={path1}
				/>
				<APath
					fillRule="evenodd"
					clipRule="evenodd"
					d="M4.12017 10.948H4.00016C3.20447 10.948 2.44136 11.2641 1.87873 11.8267C1.31609 12.3894 1 13.1525 1 13.9481V16.9483C1 17.744 1.31609 18.5071 1.87873 19.0697C2.44136 19.6324 3.20447 19.9485 4.00016 19.9485H4.12017C4.55303 19.9483 4.9808 20.0417 5.37412 20.2225C5.76744 20.4032 6.117 20.667 6.39879 20.9956L11.8621 27.3709C12.7681 28.4269 14.5007 27.7864 14.5007 26.3943V4.50214C14.5007 3.11007 12.7681 2.46954 11.8606 3.52709L6.40029 9.89943C6.11848 10.2285 5.76874 10.4926 5.37513 10.6736C4.98154 10.8546 4.55339 10.9482 4.12017 10.948Z"
					fill="#ACACAC"
				/>
				<APath
					fillRule="evenodd"
					clipRule="evenodd"
					d="M20.4893 8.20551C20.206 7.93622 19.8272 7.79052 19.4364 7.80047C19.0457 7.81042 18.6748 7.9752 18.4055 8.25857C18.1362 8.54193 17.9905 8.92067 18.0005 9.31146C18.0104 9.70225 18.1752 10.0731 18.4586 10.3424C21.4458 13.1793 21.4458 17.7477 18.4586 20.5846C18.3183 20.718 18.2056 20.8776 18.127 21.0545C18.0484 21.2314 18.0054 21.422 18.0005 21.6155C17.9956 21.809 18.0288 22.0016 18.0983 22.1823C18.1678 22.3629 18.2722 22.5281 18.4055 22.6684C18.6748 22.9518 19.0457 23.1166 19.4364 23.1265C19.6299 23.1315 19.8225 23.0982 20.0032 23.0287C20.1838 22.9592 20.349 22.8548 20.4893 22.7215C24.6997 18.7219 24.6997 12.2051 20.4893 8.20551Z"
					fill="#ACACAC"
					animatedProps={path2}
				/>
				<ARect
					x={18.788}
					y={11.611}
					width={1.871}
					height={12.871}
					rx={0.936}
					transform="rotate(-45 18.788 11.611)"
					fill="#ACACAC"
					stroke="#ACACAC"
					strokeWidth={0.3}
					animatedProps={rect1}
				/>
				<ARect
					x={20.111}
					y={20.712}
					width={1.871}
					height={12.871}
					rx={0.936}
					transform="rotate(-135 20.111 20.712)"
					fill="#ACACAC"
					stroke="#ACACAC"
					strokeWidth={0.3}
					animatedProps={rect2}
				/>
			</Svg>
		</Animated.View>
	);
};

export default VolumeIcon;
