import React from "react";
import { StyleSheet } from "react-native";

import CustomText from "_components/atoms/CustomText";
import { BLACK, GRAY } from "_styles/colors";
import { FONT_SIZE_14, FONT_SIZE_20 } from "_styles/typography";
import CreateProfileElement from "_components/molecules/create/CreateProfileElement";
import GoToMainSettingsElem from "./main-settings/GoToMainSettingsElem";
import { useContext } from "react";
import RootContext from "_components/context/RootContext";
import { CONTENT_PADDING, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { scaleSize } from "_styles/mixins";

const ProfileUserInfoView = (): JSX.Element => {
	const { firstName, lastName, dateOfBirth } = useContext(RootContext).userInfo;
	return (
		<CreateProfileElement
			leftPart={{
				style: {
					width: WIDTH_MINUS_PADDING - scaleSize(30) - CONTENT_PADDING * 3,
				},
				firstElem: <CustomText numberOfLines={1} style={styles.name}>{firstName} {lastName}</CustomText>,
				secondElem: <CustomText style={styles.birthdate}>{dateOfBirth}</CustomText>,
			}}
			rightPart={{
				style: {},
				firstElem: null,
				secondElem: <GoToMainSettingsElem />,
			}}
		/>
	);
};

const styles = StyleSheet.create({
	name: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},

	birthdate: {
		fontSize: FONT_SIZE_14,
		color: GRAY,
	},
});

export default ProfileUserInfoView;
