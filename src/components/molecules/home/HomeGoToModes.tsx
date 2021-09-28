import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "_components/atoms/CustomText";
import MainSvgView from "_atoms/MainSvgView";
import { BLACK } from "_styles/colors";
import { center } from "_styles/mixins";
import { CONTENT_PADDING, HOME_TOP_PADDING, MAIN_SMALL_SVG_HEIGHT, MAIN_SMALL_SVG_WIDTH, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import HomeIllustrationBack from "_atoms/home/HomeIllustrationBack";

const Modes = ({ Illustration, text, viewSize, onPress, disabled }: {
	onPress: () => void,
	Illustration: () => JSX.Element,
	text: string,
	viewSize: "small" | "big",
	disabled: boolean
}): JSX.Element => {
	return (
		<Pressable onPress={onPress} style={styles.mainContainer} disabled={disabled}>
			<MainSvgView type={viewSize} />
			<View style={styles.imageContainer}>
				<View style={styles.illustrationMainContainer}>
					<HomeIllustrationBack type={viewSize} />
					<View style={styles.illustration}>
						<Illustration />
					</View>
				</View>
				<View style={[
					styles.textContainer,
					viewSize === "big" ? {
						width: WIDTH_MINUS_PADDING - CONTENT_PADDING * 4,
						justifyContent: "center",
					} : center
				]}>
					<CustomText style={styles.text}>{text}</CustomText>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		...center,
		marginBottom: HOME_TOP_PADDING,
	},

	imageContainer: {
		aspectRatio: MAIN_SMALL_SVG_WIDTH / MAIN_SMALL_SVG_HEIGHT,
		height: MAIN_SMALL_SVG_HEIGHT,
		position: "absolute",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	
	illustrationMainContainer: {
		...center,
	},

	illustration: {
		position: "absolute",
	},

	textContainer: {
		height: MAIN_SMALL_SVG_HEIGHT / 4,
	},

	text: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default Modes;
