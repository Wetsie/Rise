import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import CustomText from "_components/atoms/CustomText";
import { BLACK } from "_styles/colors";
import { FONT_SIZE_16, FONT_SIZE_20 } from "_styles/typography";
import CreateProfileElement from "_components/molecules/create/CreateProfileElement";
import { CONTENT_PADDING, WIDTH_MINUS_PADDING } from "_styles/spacing";
import I18n from "i18n-js";
import Coin from "_components/atoms/profile/Coin";
import Toast from "react-native-toast-message";
import RootContext from "_components/context/RootContext";

const ProfileCurrentBalanceView = (): JSX.Element => {
	const { balance } = useContext(RootContext).userInfo;

	const showInfoAboutBalance = () => {
		Toast.show({
			type: "info",
			position: "bottom",
			text1: I18n.t("howToGetCoins1"),
			text2: I18n.t("howToGetCoins2"),
		});
	};

	return (
		<Pressable onPress={showInfoAboutBalance}>
			<CreateProfileElement
				leftPart={{
					style: styles.focusContainer,
					firstElem: <CustomText type="medium" style={styles.currentBalanceText}>{I18n.t("currentBalance")}</CustomText>,
					secondElem: null,
				}}
				rightPart={{
					style: {
						alignItems: "center",
						flexDirection: "row",
					},
					firstElem: <CustomText numberOfLines={1} type="medium" style={styles.currentBalanceValText}>{balance}</CustomText>,
					secondElem: <Coin />,
				}}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	focusText: {
		marginLeft: CONTENT_PADDING / 2,
		fontSize: FONT_SIZE_16,
		color: BLACK,
	},

	currentBalanceText: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},

	currentBalanceValText: {
		width: WIDTH_MINUS_PADDING / 2 - CONTENT_PADDING * 3,
		fontSize: FONT_SIZE_20,
		textAlign: "right",
		color: BLACK,
	},

	focusContainer: {
		alignItems: "center",
		flexDirection: "row",
	},
});

export default ProfileCurrentBalanceView;
