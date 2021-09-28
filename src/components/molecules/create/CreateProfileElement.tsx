import React from "react";
import { StyleSheet, View } from "react-native";

import { BLACK, GRAY } from "_styles/colors";
import { CONTENT_PADDING, HOME_TOP_PADDING } from "_styles/spacing";
import ProfileElementsView from "_components/atoms/ProfileElementsView";
import { FONT_SIZE_14, FONT_SIZE_20 } from "_styles/typography";
import { ViewStyle } from "react-native";

interface ProfileProps {
    leftPart: {
        style: ViewStyle,
        firstElem: JSX.Element,
        secondElem: JSX.Element | null,
    },
    rightPart: {
        style: ViewStyle,
        firstElem: JSX.Element | null,
        secondElem: JSX.Element | null,
        thirdElem?: JSX.Element,
        fourthElem?: JSX.Element,
    },
}

const CreateProfileElement = ({ leftPart, rightPart }: ProfileProps): JSX.Element => {
	return (
		<View style={styles.userInfoContainer}>
			<ProfileElementsView />
			<View style={styles.userInfo}>
				<View style={leftPart.style}>
					{leftPart.firstElem}
					{leftPart.secondElem}
				</View>
				<View style={rightPart.style}>
					<View style={[rightPart.style, rightPart.thirdElem && rightPart.fourthElem ? { marginRight: CONTENT_PADDING / 2 } : null]}>
						{rightPart.firstElem}
						{rightPart.secondElem}
					</View>
					{rightPart.thirdElem ?? null}
					{rightPart.fourthElem ?? null}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userInfoContainer: {
		marginBottom: HOME_TOP_PADDING,
		justifyContent: "center",
	},

	userInfo: {
		width: "100%",
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: CONTENT_PADDING,
	},

	name: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},

	birthdate: {
		fontSize: FONT_SIZE_14,
		color: GRAY,
	},
});

export default CreateProfileElement;
