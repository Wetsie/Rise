import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import I18n from "i18n-js";

import CreateSvgView from "_components/molecules/create/CreateSvgView";
import CustomText from "_components/atoms/CustomText";
import { HOME_TOP_PADDING, PROFILE_DOT_SIZE, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { DBLUE, GRAY } from "_styles/colors";
import { FONT_SIZE_16, FONT_SIZE_20, FONT_SIZE_36 } from "_styles/typography";
import { updateToProVersion } from "_utils/Constants";
import RootContext from "_components/context/RootContext";
import Toast from "react-native-toast-message";

const MainSettingsVersionInfo = ({ VERSION_INFO_HEIGHT, UPDATE_VERSION_HEIGHT }: { VERSION_INFO_HEIGHT: number, UPDATE_VERSION_HEIGHT: number }): JSX.Element => {
	const { proVersion } = useContext(RootContext).userInfo;

	const proVersionIsAlreadyPurchased = () => {
		Toast.show({
			type: "info",
			position: "bottom",
			text1: I18n.t("oops"),
			text2: I18n.t("youHaveAlreadyPurchasedTheProVersion"),
		});
	};
	
	return (
		<View>
			<View style={styles.versionInfoParentContainer}>
				<CreateSvgView
					width={WIDTH_MINUS_PADDING}
					height={VERSION_INFO_HEIGHT}
					color="#fff"
				/>
				<View style={styles.versionInfoContainer}>
					<CustomText type="krona" style={styles.versionNameText}>{proVersion ? "Pro" : "Basic"}</CustomText>
					<CustomText style={styles.versionInfoText}>
						{
							proVersion ?
								I18n.t("paidExtendedVersion") :
								I18n.t("freeLimitedVersion")
						}
					</CustomText>
				</View>
				<View style={styles.versionIndicatorContainer}>
					<CreateSvgView
						height={PROFILE_DOT_SIZE}
						width={PROFILE_DOT_SIZE}
						color={DBLUE}
						radius={2.5}
					/>
				</View>
			</View>
			<Pressable
				onPress={proVersion ? proVersionIsAlreadyPurchased : updateToProVersion}
				style={styles.updateVersionContainer}
			>
				<CreateSvgView
					width={WIDTH_MINUS_PADDING}
					height={UPDATE_VERSION_HEIGHT}
					color="#fff"
				/>
				<CustomText type="medium" style={styles.updateVersionText}>{I18n.t("updateVersion")}</CustomText>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	versionInfoParentContainer: {
		alignItems: "flex-end",
	},

	versionInfoContainer: {
		width: WIDTH_MINUS_PADDING,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		height: "100%",
	},

	versionIndicatorContainer: {
		position: "absolute",
		paddingTop: HOME_TOP_PADDING,
		paddingRight: HOME_TOP_PADDING,
	},

	versionInfoText: {
		fontSize: FONT_SIZE_16,
		color: GRAY,	
	},

	versionNameText: {
		fontSize: FONT_SIZE_36,
		color: "#000",	
	},

	updateVersionContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: HOME_TOP_PADDING * 1.5,
	},

	updateVersionText: {
		fontSize: FONT_SIZE_20,
		position: "absolute",
		color: DBLUE,	
	},
});

export default MainSettingsVersionInfo;
