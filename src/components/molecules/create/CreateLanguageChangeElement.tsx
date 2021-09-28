import React from "react";
import { StyleSheet, Pressable } from "react-native";
import RNRestart from "react-native-restart";

import CustomText from "_components/atoms/CustomText";
import { BLACK, DBLUE, GRAY } from "_styles/colors";
import { CONTENT_PADDING, PROFILE_DOT_SIZE } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import { mainAppLanguageCodes, MainAppLanguageTypes } from "_utils/MainSettingsUtils";
import { getLocalization } from "_utils/mmkv/MmkvGetFunctions";
import { setLocalization } from "_utils/mmkv/MmkvSetFunctions";
import { useStateSafe } from "_utils/useStateSafe";
import CreateSvgView from "./CreateSvgView";

const CreateLanguageChangeElement = ({ text }: MainAppLanguageTypes): JSX.Element => {
	const [isActive] = useStateSafe(mainAppLanguageCodes[text] === getLocalization());
	const changeLanguage = (value: string) => {
		setLocalization(value);
		RNRestart.Restart();
	};

	return (
		<Pressable
			onPress={() => changeLanguage(mainAppLanguageCodes[text])}
			style={styles.languagesTextCointainer}
		>
			<CustomText style={[styles.languagesText, { color: isActive ? BLACK : GRAY }]}>{text}</CustomText>
			<CreateSvgView
				height={PROFILE_DOT_SIZE}
				width={PROFILE_DOT_SIZE}
				color={DBLUE}
				radius={2.5}
				opacity={isActive ? 1 : 0}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	languagesTextCointainer: {
		height: "30%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: CONTENT_PADDING,
		flexDirection: "row",
	},

	languagesText: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default CreateLanguageChangeElement;
