import React from "react";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import AuthButton from "_components/molecules/auth/AuthButton";
import { BLACK, GRAY, WHITE } from "_styles/colors";
import { HOME_TOP_PADDING, STATUS_HEIGHT, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { FONT_SIZE_16, FONT_SIZE_24 } from "_styles/typography";
import { scaleSize } from "_styles/mixins";
import { useStateSafe } from "_utils/useStateSafe";

const CreateAuthScreen = ({
	illustration: Illustration,
	mainText,
	pageNumber,
	buttonText,
}: {
    illustration: () => JSX.Element,
    mainText: string,
    pageNumber: number,
    buttonText: string,
}): JSX.Element => {
	const [disableButtons, setDisableButtons] = useStateSafe(false);
	const navigation = useNavigation();
	const maxScreens = 3;

	const authenticateAnonymously = () => {
		Alert.alert(
			I18n.t("skipAuthWarn1"),
			I18n.t("skipAuthWarn2"),
			[
				{
					text: "Ok",
					onPress: () => {
						setDisableButtons(true);
						auth().signInAnonymously();
					}
				},
				{ text: I18n.t("cancel") }
			],
			{ cancelable: true }
		);
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<View style={styles.illustration}>
				<Illustration />
			</View>
			<View style={styles.content}>
				<View>
					<CustomText style={styles.text}>{mainText}</CustomText>
				</View>
				<View>
					<CustomText style={styles.currentPageText}>0{pageNumber}/03</CustomText>
					<Pressable
						disabled={disableButtons}
						onPress={
							() =>
								pageNumber === maxScreens ?
									navigation.navigate("Registration") :
									navigation.navigate("AuthIntroduction" + (pageNumber + 1))
						}
					>
						<AuthButton text={buttonText} />
					</Pressable>
					<CustomText onPress={authenticateAnonymously} style={styles.logInText}>{I18n.t("skipAuthorization")}</CustomText>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingTop: -STATUS_HEIGHT,
		backgroundColor: WHITE,
		alignItems: "center",
		flex: 1,
	},

	illustration: {
		height: scaleSize(402),
	},

	content: {
		justifyContent: "space-evenly",
		flex: 1,
	},

	text: {
		marginVertical: HOME_TOP_PADDING,
		width: WIDTH_MINUS_PADDING,
		fontSize: FONT_SIZE_24,
		textAlign: "center",
		color: BLACK,
	},

	currentPageText: {
		marginBottom: HOME_TOP_PADDING,
		fontSize: FONT_SIZE_16,
		alignSelf: "center",
		color: BLACK,
	},

	logInText: {
		marginTop: HOME_TOP_PADDING,
		fontSize: FONT_SIZE_16,
		alignSelf: "center",
		color: GRAY,
	},
});

export default CreateAuthScreen;
