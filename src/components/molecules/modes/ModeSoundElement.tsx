import React, { useContext } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import FastImage, { Source } from "react-native-fast-image";

import MainSvgView from "_atoms/MainSvgView";
import { BLACK, GRAY } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { CONTENT_PADDING, MAIN_SMALL_SVG_WIDTH } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CustomText from "_components/atoms/CustomText";
import SoundPlayIcon from "_components/atoms/modes/SoundPlayIcon";
import SoundPauseIcon from "_components/atoms/modes/SoundPauseIcon";
import ModeSoundsContext from "_components/context/ModeSoundsContext";

interface MyProps {
	index: number,
	soundPath: Source,
	soundName: string,
	soundNameLocalized: string,
	soundType: string | string[],
}

const IMAGE_WIDTH = MAIN_SMALL_SVG_WIDTH - CONTENT_PADDING * 2;
const IMAGE_HEIGHT = scaleSize(140);

const ModeSoundElement = (props: MyProps): JSX.Element => {
	const { index, soundPath, soundName, soundNameLocalized, soundType } = props;
	const { chosenSound, isActive, onPress, newSoundNames } = useContext(ModeSoundsContext);
	const mainStyle: ViewStyle = {
		...styles.mainContainer,
		marginLeft: index % 2 ? 0 : CONTENT_PADDING,
		marginRight: index % 2 ? 0 : CONTENT_PADDING,
	};

	const IconToReturn = () => {
		if (
			newSoundNames.findIndex(value => {
				return value === chosenSound;
			}) === index) {
			return isActive ? <SoundPauseIcon /> : <SoundPlayIcon />;
		} else {
			return null;
		}
	};

	return (
		<Pressable onPress={() => onPress(index, soundName, soundType)} style={mainStyle}>
			<MainSvgView type="small" />
			<View style={styles.imageAndTextContainer}>
				<View style={styles.imageContainer}>
					<FastImage
						source={soundPath}
						style={styles.soundImage}
					/>
					<IconToReturn />
				</View>
				<CustomText
					style={[
						styles.soundText,
						{
							color: newSoundNames.findIndex(value => {
								return value === chosenSound;
							}) === index ? BLACK : GRAY
						}
					]}
				>{soundNameLocalized}</CustomText>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: "center",
	},

	imageAndTextContainer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-evenly",
		height: "100%",
		width: "100%",
	},

	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
	},

	soundImage: {
		aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
		height: IMAGE_HEIGHT,
		borderRadius: 15,
	},

	soundText: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default React.memo(ModeSoundElement);