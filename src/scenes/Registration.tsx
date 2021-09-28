import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, KeyboardAvoidingView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import I18n from "i18n-js";

import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { mix } from "react-native-redash";

import CustomText from "_components/atoms/CustomText";
import { BLACK, DBLUE, GRAY, LBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_16, FONT_SIZE_30 } from "_styles/typography";
import GoogleRegButton from "_components/atoms/auth/GoogleRegButton";
import FacebookRegButton from "_components/atoms/auth/FacebookRegButton";
import AuthButton from "_components/molecules/auth/AuthButton";
import RegistrationSection from "_components/molecules/auth/RegistrationSection";
import { CONTENT_PADDING, HOME_TOP_PADDING } from "_styles/spacing";
import { useStateSafe } from "_utils/useStateSafe";

const elemHeight = scaleSize(56);
const { width } = Dimensions.get("window");

const Registration = (): JSX.Element => {
	const [disableButtons, setDisableButtons] = useStateSafe(false);
	const [confirm, setConfirm] = useStateSafe<FirebaseAuthTypes.ConfirmationResult>({ verificationId: null, confirm: async () => null });
	const [isPhoneEntered, setIsPhoneEntered] = useStateSafe(false);
	const [phone, setPhone] = useStateSafe("");
	const [code, setCode] = useStateSafe("");
	const isToggled = useSharedValue(0);
	const transition = useDerivedValue(() => {
		return withTiming(isToggled.value, { duration: 1000 });
	});

	const codeInputStyle = useAnimatedStyle(() => {
		return {
			opacity: mix(transition.value, 0, 1)
		};
	});

	const confirmButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [{
				translateY: mix(transition.value, -(elemHeight + HOME_TOP_PADDING), 0)
			}]
		};
	});

	useEffect(() => {
		isToggled.value = isPhoneEntered ? 1 : 0;
	}, [isPhoneEntered]);

	const signInWithPhoneNumber = async (phoneNumber: string) => {
		try {
			if (!phoneNumber.length) {
				Toast.show({
					type: "error",
					text1: I18n.t("missingPhoneNumberErr"),
					position: "bottom",
				});
				return;
			}
			const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
			setConfirm(confirmation);
			setIsPhoneEntered(true);
		} catch (e) {
			switch (e.code) {
			case "auth/invalid-phone-number":
				Toast.show({
					type: "error",
					text1: I18n.t("invalidPhoneNumberErr1"),
					text2: I18n.t("invalidPhoneNumberErr2"),
					position: "bottom",
				});
				break;

			case "auth/quota-exceeded":
				Toast.show({
					type: "error",
					text1: I18n.t("quotaExceededErr"),
					position: "bottom",
				});
				break;

			case "auth/user-disabled":
				Toast.show({
					type: "error",
					text1: I18n.t("userDisabledErr"),
					position: "bottom",
				});
				break;
			}
		}
	};
	const confirmCode = async () => {
		try {
			await confirm.confirm(code);
		} catch (e) {
			e;
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<KeyboardAvoidingView behavior="position">
				<View style={styles.pleaseRegister}>
					<CustomText style={styles.register}>{I18n.t("pleaseAuthencticate")}</CustomText>
				</View>
				<RegistrationSection
					text={I18n.t("usingSocialMedia")}
					firstElement={
						() =>
							<GoogleRegButton
								disabled={disableButtons}
								disableButtons={() => setDisableButtons(true)}
							/>
					}
					secondElement={
						() =>
							<FacebookRegButton
								disabled={disableButtons}
								disableButtons={() => setDisableButtons(true)}
							/>
					}
				/>
				<View style={styles.mainSectionContainer}>
					<View style={styles.socialMediaTextContainer}>
						<View style={[styles.line, { marginRight: CONTENT_PADDING }]} />
						<CustomText style={styles.socialMediaText}>{I18n.t("or")}</CustomText>
						<View style={[styles.line, { marginLeft: CONTENT_PADDING }]} />
					</View>
					<View style={styles.buttonContainer}>
						<TextInput
							placeholder={I18n.t("enterYourPhoneNumber")}
							textContentType="telephoneNumber"
							placeholderTextColor={GRAY}
							keyboardType="phone-pad"
							style={styles.textInput}
							onChangeText={text => {
								const formattedText = text.replace(/[.#()/,;*N]/g, "");
								setPhone(formattedText);
							}}
							selectionColor={GRAY}
							textAlign="center"
							value={phone}
						/>
					</View>
					<Animated.View style={[styles.buttonContainer, codeInputStyle]}>
						<TextInput
							placeholder={I18n.t("enterConfirmationCode")}
							textContentType="oneTimeCode"
							placeholderTextColor={GRAY}
							keyboardType="number-pad"
							style={styles.textInput}
							onChangeText={text => {
								const formattedText = text.replace(/[.,]/g, "");
								setCode(formattedText);
							}}
							selectionColor={GRAY}
							textAlign="center"
							value={code}
						/>
					</Animated.View>
					<Animated.View style={[styles.buttonContainer, confirmButtonStyle]}>
						<Pressable
							disabled={disableButtons}
							onPress={
								() => confirm.verificationId ?
									confirmCode() :
									signInWithPhoneNumber(phone)
							}
						>
							<AuthButton text={I18n.t("continue")} />
						</Pressable>
					</Animated.View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingHorizontal: (width - scaleSize(302)) / 2,
		backgroundColor: WHITE,
		flex: 1,
	},

	pleaseRegister: {
		justifyContent: "center",
		marginVertical: HOME_TOP_PADDING * 4,
	},

	register: {
		fontSize: FONT_SIZE_30,
		textAlign: "center",
		color: BLACK,
	},

	mainSectionContainer: {
		marginTop: HOME_TOP_PADDING,
	},
	
	buttonContainer: {
		marginTop: HOME_TOP_PADDING,
	},
	
	line: {
		backgroundColor: LBLUE,
		height: scaleSize(2),
		flex: 1,
	},
	
	socialMediaTextContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	
	socialMediaText: {
		fontSize: FONT_SIZE_16,
		color: DBLUE,
	},

	textInput: {
		color: BLACK,
		height: elemHeight,
		fontFamily: "FuturaPT-Book",
		fontSize: FONT_SIZE_16,
		borderColor: DBLUE,
		borderRadius: 15,
		borderWidth: 2,
	},
});

export default Registration;
