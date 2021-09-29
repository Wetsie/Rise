import I18n from "i18n-js";
import { PushNotificationObject } from "react-native-push-notification";
import * as InAppPurchases from "expo-in-app-purchases";
import RNRestart from "react-native-restart";
import { DBLUE } from "_styles/colors";
import { UserInfo } from "./UserInfo";
import { user, userDatabaseReference } from "./Firebase";
import { setMmkvUserInfo } from "./mmkv/MmkvSetFunctions";
import Toast from "react-native-toast-message";

const PRO_VERSION_PRODUCT_ID = "proversion";
const YOU_GOT_COINS = 4;
export const FOCUS_ENDED_AHEAD_OF_TIME_ID = 1;
export const NAP_ENDED_AHEAD_OF_TIME_ID = 2;
export const MEDITATION_ENDED_AHEAD_OF_TIME_ID = 3;
export const FOCUS_IMMERSIVE_MODE_HANDLER_KEY = "focusImmersiveMode";
export const MAIN_CHANNEL_ID = "rise-main-channel-id";
export const MAIN_CHANNEL_NAME = "rise-main-channel";

const defaultConfig: PushNotificationObject = {
	channelId: MAIN_CHANNEL_ID,
	color: DBLUE,
	vibrate: false,
	ongoing: false,
	playSound: false,
	invokeApp: true,
				
	id: 0,
	title: "",
	message: "",
	userInfo: { id: 0 },
};

export const restoreProVersionPurchase = async (userInfo: UserInfo): Promise<void> => {
	const { responseCode, results } = await InAppPurchases.getPurchaseHistoryAsync();

	if (userInfo.proVersion) {
		Toast.show({
			type: "info",
			position: "bottom",
			text1: I18n.t("oops"),
			text2: I18n.t("proVersionIsAlreadyActive"),
		});
		return;
	}

	if (responseCode === InAppPurchases.IAPResponseCode.OK && results?.length) {
		setMmkvUserInfo({
			...userInfo,
			proVersion: true,
		});
		if (!user?.isAnonymous) {
			userDatabaseReference.update({
				proVersion: true,
			});
		}
		RNRestart.Restart();
	} else {
		Toast.show({
			type: "info",
			position: "bottom",
			text1: I18n.t("oops"),
			text2: I18n.t("youHaventPurchasedProVersion"),
		});
	}
};

export const connectInAppPayments = async (userInfo: UserInfo): Promise<void> => {
	await InAppPurchases.connectAsync();
	
	InAppPurchases.setPurchaseListener(({ responseCode, results }) => {
		if (responseCode === InAppPurchases.IAPResponseCode.OK) {
			results?.forEach(purchase => {
				if (!purchase.acknowledged) {
					setMmkvUserInfo({
						...userInfo,
						proVersion: true,
					});
					if (!user?.isAnonymous) {
						userDatabaseReference.update({
							proVersion: true,
						});
					}

					InAppPurchases.finishTransactionAsync(purchase, false);
					RNRestart.Restart();
				}
			});
		}
	});
};

export const updateToProVersion = async (): Promise<void> => {
	const { responseCode } = await InAppPurchases.getProductsAsync([PRO_VERSION_PRODUCT_ID]);

	if (responseCode === InAppPurchases.IAPResponseCode.OK) {
		await InAppPurchases.purchaseItemAsync(PRO_VERSION_PRODUCT_ID);
	}
};

export const youGotCoinsNotif: PushNotificationObject = {
	...defaultConfig,
	id: YOU_GOT_COINS,
	userInfo: { id: YOU_GOT_COINS },
	title: I18n.t("youGotCoins1"),
	timeoutAfter: 3000,
};

export const focusEndedAheadOfTimeNotif: PushNotificationObject = {
	...defaultConfig,
	id: FOCUS_ENDED_AHEAD_OF_TIME_ID,
	userInfo: { id: FOCUS_ENDED_AHEAD_OF_TIME_ID },
	title: I18n.t("focusEndedAhead"),
	message: I18n.t("timeWillNotBeRecorded"),
	timeoutAfter: 5000,
};

export const napEndedAheadOfTimeNotif: PushNotificationObject = {
	...defaultConfig,
	id: NAP_ENDED_AHEAD_OF_TIME_ID,
	userInfo: { id: NAP_ENDED_AHEAD_OF_TIME_ID },
	title: I18n.t("napEndedAhead"),
	message: I18n.t("timeWillNotBeRecorded"),
	timeoutAfter: 5000,
};

export const meditationEndedAheadOfTimeNotif: PushNotificationObject = {
	...defaultConfig,
	id: MEDITATION_ENDED_AHEAD_OF_TIME_ID,
	userInfo: { id: MEDITATION_ENDED_AHEAD_OF_TIME_ID },
	title: I18n.t("meditationEndedAhead"),
	message: I18n.t("timeWillNotBeRecorded"),
	timeoutAfter: 5000,
};