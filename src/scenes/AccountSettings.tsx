import React, { useContext } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";
import RNRestart from "react-native-restart";
import { useNavigation } from "@react-navigation/native";
import I18n from "i18n-js";

import { BLACK, RED, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { HOME_TOP_PADDING, STATUS_HEIGHT, WIDTH_MINUS_PADDING } from "_styles/spacing";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import MainSettingsVersionInfo from "_components/molecules/profile/main-settings/MainSettingsVersionInfo";
import MainSettingsBirthdateName from "_components/molecules/profile/main-settings/MainSettingsBirthdateName";
import CustomText from "_components/atoms/CustomText";
import { FONT_SIZE_20 } from "_styles/typography";
import RootContext from "_components/context/RootContext";
import { deleteAccount, logOut } from "_utils/Firebase";
import { setMmkvIsSignedIn, setMmkvProfileImageUri } from "_utils/mmkv/MmkvSetFunctions";
import { MMKV } from "react-native-mmkv";
import { isSignedInKey, profileImageKey, profileImageUriKey, userInfoKey } from "_utils/mmkv/MmkvKeys";

const ASafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const { height } = Dimensions.get("window");
const VERSION_INFO_HEIGHT = scaleSize(120);
const UPDATE_VERSION_HEIGHT = scaleSize(56);
const IMAGE_PADDING = HOME_TOP_PADDING / 1.5 + HOME_TOP_PADDING;
const CLAMP_HEIGHT = height / 4;

const AccountSettingsScreen = (): JSX.Element => {
	const { profileImage } = useContext(RootContext);
	const navigation = useNavigation();
	const translateY = useSharedValue(0);

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, ctx: { offsetY: number }) => {
			ctx.offsetY = translateY.value;
		},

		onActive: (event, ctx: { offsetY: number }) => {
			translateY.value = clamp(ctx.offsetY + event.translationY, -CLAMP_HEIGHT, 0);
		},

		onEnd: (event) => {
			translateY.value = 
			withDecay({
				deceleration: 0.995,
				velocity: event.velocityY,
				clamp: [-CLAMP_HEIGHT, 0]
			});
		}
	});

	const swipeStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value },
			],
			alignItems: "center",
		};
	});

	const logOutCallback = () => {
		setMmkvProfileImageUri("");
		setMmkvIsSignedIn(false);
		RNRestart.Restart();
	};

	const deleteAccountCallback = () => {
		MMKV.delete(userInfoKey);
		MMKV.delete(profileImageUriKey);
		MMKV.delete(isSignedInKey);
		MMKV.delete(profileImageKey);
		RNRestart.Restart();
	};
	
	const logOutAlert = () => {
		Alert.alert(
			"",
			I18n.t("logOutWarning"),
			[
				{ text: I18n.t("yes"), onPress: () => logOut(logOutCallback) },
				{ text: I18n.t("no") },
			],
		);
	};
	
	const deleteAccountAlert = () => {
		Alert.alert(
			"",
			I18n.t("deleteAccountWarning"),
			[
				{ text: I18n.t("yes"), onPress: () => deleteAccount(deleteAccountCallback) },
				{ text: I18n.t("no") },
			],
		);
	};

	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<ASafeAreaView style={styles.mainScreen}>
				<CreateGoBackView
					goBackText={I18n.t("settingsAccount")}
					style={styles.goBackStyle}
				/>
				<Animated.View style={swipeStyle}>
					<Pressable onPress={() => navigation.navigate("ChangeUserInfo")} style={{ alignItems: "center" }}>
						<Image
							source={{
								uri: profileImage?.uri ?? "",
							}}
							style={styles.imageStyle}
						/>
						<MainSettingsBirthdateName />
					</Pressable>
					<MainSettingsVersionInfo
						VERSION_INFO_HEIGHT={VERSION_INFO_HEIGHT}
						UPDATE_VERSION_HEIGHT={UPDATE_VERSION_HEIGHT}
					/>
					<CustomText
						onPress={logOutAlert}
						style={styles.accountQuitText}
					>{I18n.t("quitFromAccount")}</CustomText>
					<CustomText
						onPress={deleteAccountAlert}
						style={styles.accountDeleteText}
					>{I18n.t("deleteAccount")}</CustomText>
				</Animated.View>
			</ASafeAreaView>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	mainScreen: {
		paddingTop: -STATUS_HEIGHT,
		backgroundColor: WHITE,
		height: height + CLAMP_HEIGHT * 2,
	},

	goBackStyle: {
		zIndex: 1,
	},

	imageStyle: {
		aspectRatio: WIDTH_MINUS_PADDING / WIDTH_MINUS_PADDING,
		height: WIDTH_MINUS_PADDING,
		marginTop: IMAGE_PADDING,
		borderRadius: 15,
	},

	accountQuitText: {
		marginTop: HOME_TOP_PADDING,
		marginBottom: HOME_TOP_PADDING / 2,
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},

	accountDeleteText: {
		fontSize: FONT_SIZE_20,
		color: RED,
	},
});

export default AccountSettingsScreen;
