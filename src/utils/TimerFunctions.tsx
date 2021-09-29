import { setMmkvUserInfo } from "./mmkv/MmkvSetFunctions";
import PushNotification from "react-native-push-notification";
import { youGotCoinsNotif } from "./Constants";
import I18n from "i18n-js";

import { user, userDatabaseReference } from "./Firebase";
import { UserInfo } from "./PropTypes";

export const changeStat = (
	newStat: number,
	mode: "focus" | "meditation" | "nap" | "",
	userInfo: UserInfo,
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
): void => {
	const { focus, meditation, nap } = userInfo.stat;
	const newFocusStat = mode === "focus" ? focus + newStat : focus;
	const newMeditationStat = mode === "meditation" ? meditation + newStat : meditation;
	const newNapStat = mode === "nap" ? nap + newStat : nap;
	const newBalance = Math.floor((newFocusStat + newMeditationStat + newNapStat) / 60) * 100;

	if (newBalance > userInfo.balance) {
		PushNotification.localNotification({
			...youGotCoinsNotif,
			message: I18n.t("youGotCoins2") + " " + (newBalance - userInfo.balance) + " " + I18n.t("youGotCoins3"),
		});
	}

	setUserInfo({
		...userInfo,
		balance: newBalance,
		stat: {
			focus: newFocusStat,
			meditation: newMeditationStat,
			nap: newNapStat,
		}
	});
	setMmkvUserInfo({
		...userInfo,
		balance: newBalance,
		stat: {
			focus: newFocusStat,
			meditation: newMeditationStat,
			nap: newNapStat,
		}
	});
	
	if (!user?.isAnonymous) {
		userDatabaseReference.update({
			balance: newBalance,
			stat: {
				focus: newFocusStat,
				meditation: newMeditationStat,
				nap: newNapStat,
			}
		});
	}
};
