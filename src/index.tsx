import React, { useEffect } from "react";
import { LogBox, AppState, Vibration, AppStateStatus } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import firebase from "@react-native-firebase/app";
import BackgroundTimer from "react-native-background-timer";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import I18n from "i18n-js";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import PushNotification from "react-native-push-notification";
import Toast from "react-native-toast-message";

import { withPause } from "react-native-redash";
import { Easing, runOnJS, withRepeat, withTiming, useSharedValue } from "react-native-reanimated";

import RootNavigator from "./navigations";
import RootContext from "_components/context/RootContext";
import {
	getAlarmDuration,
	getBreakMinutes,
	getFocusActiveMode,
	getFocusFullImmersion,
	getFocusSleepModeDisabled,
	getIsAlarmOn,
	getIsSignedIn,
	getLocalization,
	getLongBreakEvery,
	getLongBreakMinutes,
	getMeditationBreathPerMin,
	getMeditationBreathSounds,
	getMeditationSleepModeDisabled,
	getMeditationVibration,
	getMmkvSystemAlarmsObject,
	getNapSleepModeDisabled,
	getRingtone,
	getSwipeTextSize,
	getUserInfo,
	getVolume,
	getWasAlarmsLoaded
} from "_utils/mmkv/MmkvGetFunctions";
import { mainAppTranslations } from "_utils/Localization";
import { firebaseConfig } from "_utils/Firebase";
import { IMMERSIVE_MODE_SECONDS, loadExhaleSound, loadFonts, loadInhaleSound, setAudioMode } from "_utils/RootComponentUtils";

import { loadSoundFromPhone } from "_utils/ModeSoundsListProps";
import { useStateSafe } from "_utils/useStateSafe";
import googleServices from "../android/app/google-services.json";
import FetchDataContext from "_components/context/FetchDataContext";
import FetchData from "_components/molecules/FetchData";
import { changeStat } from "_utils/TimerFunctions";
import { setMmkvWasAlarmsLoaded, setWasHappyBirthdayToggled } from "_utils/mmkv/MmkvSetFunctions";
import { FOCUS_IMMERSIVE_MODE_HANDLER_KEY, MAIN_CHANNEL_NAME, MAIN_CHANNEL_ID, focusEndedAheadOfTimeNotif, napEndedAheadOfTimeNotif, meditationEndedAheadOfTimeNotif, connectInAppPayments } from "_utils/Constants";
import { AppStateService } from "_utils/AppStateService";

LogBox.ignoreLogs(["Constants.manifest", "Require cycles are allowed", "Cannot complete operation because sound is not loaded", "Constants.installationId", "Constants.deviceId", "Constants.linkingUrl"]);

enableScreens();
setAudioMode();
I18n.translations = mainAppTranslations;
I18n.locale = getLocalization();

!firebase.apps.length ?
	firebase.initializeApp(firebaseConfig) :
	firebase.app();

googleServices.client[0].oauth_client.map(item => {
	if (item.client_type === 3) {
		GoogleSignin.configure({
			webClientId: item.client_id,
		});
	}
});

PushNotification.configure({
	onNotification: notification => { notification; },
	popInitialNotification: true,
	requestPermissions: true,
});

PushNotification.createChannel(
	{
		channelId: MAIN_CHANNEL_ID,
		channelName: MAIN_CHANNEL_NAME,
		channelDescription: "A channel to categorise notifications",
		playSound: false,
	},
	created => created
);

AppStateService.init();

const inhale = I18n.t("inhale");
const exhale = I18n.t("exhale");

const App = (): JSX.Element => {
	const [wasModeEndedAheadOfTime, setWasModeEndedAheadOfTime] = useStateSafe(true);
	const [immersiveModeTimerId, setImmersiveModeTimerId] = useStateSafe(0);
	const [wasAlarmsLoaded, setWasAlarmsLoaded] = useStateSafe(getWasAlarmsLoaded());
	const [isSignedIn, setIsSignedIn] = useStateSafe(getIsSignedIn());
	const [systemAlarmsObject, setSystemAlarmsObject] = useStateSafe(getMmkvSystemAlarmsObject());
	const [isLoaded, setIsLoaded] = useStateSafe(false);
	const [swipeTextSize, setSwipeTextSize] = useStateSafe(getSwipeTextSize());
	const [activeModeIndex, setActiveModeIndex] = useStateSafe(getFocusActiveMode());
	const [isTimerOn, setIsTimerOn] = useStateSafe(false);
	const [sound] = useStateSafe(new Audio.Sound());
	const [alarmSound] = useStateSafe(new Audio.Sound());
	const [breathSound] = useStateSafe(new Audio.Sound());
	const [userInfo, setUserInfo] = useStateSafe(getUserInfo());

	//#region animation values
	const timerMinutes = useSharedValue(5 * 60);
	const pomodoroMinutes = useSharedValue(5 * 60);
	const infiniteTime = useSharedValue(0);
	const isToggled = useSharedValue(0);
	const modeNavigation = useSharedValue<"focus" | "meditation" | "nap" | "">("");
	const pomodoroMode = useSharedValue<"session"| "break">("session");
	const meditationMode = useSharedValue(inhale);
	const isTimerPaused = useSharedValue(true);
	const volume = useSharedValue(getVolume().value);

	const pomodoroCurrentBreakTime = useSharedValue(0); 

	const timerCountdownProgress = useSharedValue(0);
	const timerPomodoroProgress = useSharedValue(0);
	const timerInfiniteProgress = useSharedValue(0);
	const meditationProgress = useSharedValue(0);

	//#region focusSettings
	const focusFullImmersion = useSharedValue(getFocusFullImmersion());
	const focusSleepModeDisabled = useSharedValue(getFocusSleepModeDisabled());
	const pomodoroBreakMinutes = useSharedValue(getBreakMinutes());
	const pomodoroLongBreakMinutes = useSharedValue(getLongBreakMinutes());
	const pomodoroLongBreakEvery = useSharedValue(getLongBreakEvery());
	//#endregion

	//#region napSettings
	const napAlarmDuration = useSharedValue(getAlarmDuration());
	const napIsAlarmOn = useSharedValue(getIsAlarmOn());
	const napRingtone = useSharedValue(getRingtone());

	const napSleepModeDisabled = useSharedValue(getNapSleepModeDisabled());
	//#endregion

	//#region meditationSettings
	const meditationBreathSounds = useSharedValue(getMeditationBreathSounds());
	const meditationVibration = useSharedValue(getMeditationVibration());
	const meditationSleepModeDisabled = useSharedValue(getMeditationSleepModeDisabled());
	const meditationBreathPerMin = useSharedValue(getMeditationBreathPerMin());
	//#endregion

	//#endregion
	
	// if full immersive mode is on, then the timer will end 10 seconds after minimizing the application
	const fullImmersiveModeHandler = (nextAppState: AppStateStatus): void => {
		if (modeNavigation.value === "focus" && !focusFullImmersion.value) {
			if (nextAppState === "background") {
				const timeoutId = BackgroundTimer.setTimeout(() => {
					setIsTimerOn(false);
					timerMinutes.value = 5 * 60;
					sound.unloadAsync();
				}, IMMERSIVE_MODE_SECONDS);
				setImmersiveModeTimerId(timeoutId);
			} else {
				BackgroundTimer.clearTimeout(immersiveModeTimerId + 1);
			}
		}
	};
	
	//#region finish func
	const onCountdownFinish = async () => { // executes on countdown timer finish
		setWasModeEndedAheadOfTime(false);

		if (modeNavigation.value === "nap" && !napIsAlarmOn.value) { // if current mode is nap and alarm is on - play the alarm sound
			loadSoundFromPhone({
				sound: alarmSound,
				volume: volume.value,
				uri: systemAlarmsObject[napRingtone.value]
			});

			BackgroundTimer.setTimeout(async () => { // unload the alarm sound after chosen time
				await alarmSound.unloadAsync();
			}, napAlarmDuration.value * 1000);
		}

		setIsTimerOn(false); // disabling timer
		changeStat(timerMinutes.value / 60, modeNavigation.value, userInfo, setUserInfo); // saving stat
		timerMinutes.value = modeNavigation.value === "meditation" ? 1 * 60 : 5 * 60; // resetting time
		await sound.unloadAsync();
	};

	const onPomodoroFinish = (): void => { // executes on pomodoro timer finish
		setWasModeEndedAheadOfTime(false);

		timerPomodoroProgress.value = 0;
		if (pomodoroMode.value === "session") {
			changeStat(timerMinutes.value / 60, modeNavigation.value, userInfo, setUserInfo);

			pomodoroMode.value = "break";
			pomodoroCurrentBreakTime.value++; // increasing the amount of breaks, because session just ended

			if (pomodoroCurrentBreakTime.value === pomodoroLongBreakEvery.value) { // if next break should be long - timer will start with the long break time
				timerPomodoroProgress.value = withPause(
					withTiming(1, {
						duration: pomodoroLongBreakMinutes.value * 60 * 1000,
						easing: Easing.linear
					},
					(isFinished) => {
						if (isFinished) {
							runOnJS(onPomodoroFinish)();
						}
					}),
					isTimerPaused,
				);
				pomodoroMinutes.value = pomodoroLongBreakMinutes.value * 60;
				pomodoroCurrentBreakTime.value = 0;
			} else { // otherwise timer will start with the normal break time
				timerPomodoroProgress.value = withPause(
					withTiming(1, {
						duration: pomodoroBreakMinutes.value * 60 * 1000,
						easing: Easing.linear
					},
					(isFinished) => {
						if (isFinished) {
							runOnJS(onPomodoroFinish)();
						}
					}),
					isTimerPaused,
				);
				pomodoroMinutes.value = pomodoroBreakMinutes.value * 60;
			}
		} else { // starts a new session
			pomodoroMode.value = "session";
			pomodoroMinutes.value = timerMinutes.value;
		}
	};

	const onInfiniteFinish = (): void => { // executes on each second of the infinite timer
		setWasModeEndedAheadOfTime(false);

		infiniteTime.value++;
		if (!(infiniteTime.value % 60) && infiniteTime.value) { // changes stat when current time >= 1 minute
			changeStat(infiniteTime.value / 60, "focus", userInfo, setUserInfo);
		}
	};

	const onMeditationFinish = async () => { // executes on meditation timer finish
		setWasModeEndedAheadOfTime(false);

		if (!meditationVibration.value) {
			Vibration.vibrate();
		}
			
		await breathSound.unloadAsync();
		
		if (meditationMode.value === inhale && isToggled.value) { // changing cycles from inhale to exhale and vice versa
			meditationMode.value = exhale;
		} else if (isToggled.value) {
			meditationMode.value = inhale;
		}
	
		if (!meditationBreathSounds.value) {
			if (meditationMode.value === inhale && isToggled.value) {
				loadExhaleSound(breathSound, volume);
			} else if (isToggled.value) {
				loadInhaleSound(breathSound, volume);
			}
		}
	};
	//#endregion

	//#region lifecycle 
	useEffect(() => {
		if (isSignedIn) {
			connectInAppPayments(userInfo);
		}
	}, [isSignedIn]);

	useEffect(() => {
		if (Object.keys(systemAlarmsObject).length) {
			setWasAlarmsLoaded(true);
			setMmkvWasAlarmsLoaded(true);
		}
	}, [systemAlarmsObject]);

	useEffect(() => { // custom app state listener
		AppState.addEventListener(
			"change",
			AppStateService.getInstance().handleAppStateChange,
		);

		return () =>
			AppState.removeEventListener(
				"change", 
				AppStateService.getInstance().handleAppStateChange
			);
	}, []);

	useEffect(() => {
		if (isTimerOn) { // listen to current app state if full immersive mode is on and timer is on
			AppStateService.getInstance().addStateHandler(FOCUS_IMMERSIVE_MODE_HANDLER_KEY, fullImmersiveModeHandler);
		} else {
			AppStateService.getInstance().removeStateHandler(FOCUS_IMMERSIVE_MODE_HANDLER_KEY);
		}
	}, [isTimerOn]);

	useEffect(() => {
		if (userInfo.dateOfBirth !== new Date().toLocaleDateString()) {
			setWasHappyBirthdayToggled(false);
		}
	}, []);

	useEffect(() => {
		if (isLoaded) {
			SplashScreen.hide();
		} else {
			loadFonts(
				{ icomoon: require("_assets/fonts/icomoon.ttf") },
				setIsLoaded
			);
		}
	}, [isLoaded]);

	useEffect(() => {
		isToggled.value = isTimerOn ? 1 : 0;
	}, [isToggled, isTimerOn]);

	useEffect(() => { // disabling sleep mode
		if (isTimerOn) {
			if (modeNavigation.value === "focus" && !focusSleepModeDisabled.value) {
				activateKeepAwake();
			} else if (modeNavigation.value === "meditation" && !meditationSleepModeDisabled.value) {
				activateKeepAwake();
			} else if (modeNavigation.value === "nap" && !napSleepModeDisabled.value) {
				activateKeepAwake();
			}
		} else {
			deactivateKeepAwake();
		}
	}, [isTimerOn]);

	/* timer logic explanation
		It's done with Reanimated v2,
		because standart setInterval is to complex and doesn't guarantee timer accuracy,
		namely, one second of setInterval can last longer than the actual second.

		How does this work?

		Basically, when you press play, a new "withTiming" function starts
		with the time you've chosen. This function just sets a "timer" and
		saves it's progress in an animation value, so in our example - timerCountdownProgress.
		Then I use this progress animation value to display the remaining time to the user.
		It's done by interpolating current progress. You can see all interpolation functions
		in the component called "TimerContentItem".
		
		It looks like this:
			const timeToCalculate = useDerivedValue(() => {
				return Math.ceil(
					interpolate(
						timerCountdownProgress.value,
						[0, 1],
						[timerMinutes.value, 0]
					)
				);
			});

		So, if I chose 5 minutes, and my current progress animation value equals 0.1,
		then the past tense will be equal: minutes * 60 * 0.1 and in our case - 5 * 60 * 0.1,
		which equals 30 seconds. The only thing I need to do after getting these 30 seconds,
		is to convert them to minutes and seconds and as a result the user sees,
		that 4 minutes 30 seconds left until the end of the timer.

		To fully understand this algorithm, I would recommend you to check the Reanimated docs:
		https://docs.swmansion.com/react-native-reanimated/docs
		Redash docs:
		https://wcandillon.gitbook.io/redash/ 
		And library developer's youtube channel:
		https://www.youtube.com/c/wcandillon
	*/
	useEffect(() => {
		if (modeNavigation.value === "focus") {
			if (isTimerOn) {
				if (activeModeIndex === 0) {
					timerCountdownProgress.value = withPause(
						withTiming(1, {
							duration: timerMinutes.value * 1000,
							easing: Easing.linear
						},
						(isFinished) => {
							if (isFinished) {
								runOnJS(onCountdownFinish)();
							}
						}),
						isTimerPaused,
					);
				} else if (activeModeIndex === 1) {
					timerPomodoroProgress.value = withPause(
						withTiming(1, {
							duration: timerMinutes.value * 1000,
							easing: Easing.linear
						},
						(isFinished) => {
							if (isFinished) {
								runOnJS(onPomodoroFinish)();
							}
						}),
						isTimerPaused,
					);
				} else {
					timerInfiniteProgress.value = withPause(
						withRepeat(
							withTiming(1, {
								duration: 1000,
								easing: Easing.linear
							},
							(isFinished) => {
								if (isFinished) {
									runOnJS(onInfiniteFinish)();
								}
							}),
							Number.MAX_SAFE_INTEGER,
							false,
						),
						isTimerPaused,
					);
				}
			} else {
				if (wasModeEndedAheadOfTime) {
					PushNotification.localNotification(focusEndedAheadOfTimeNotif);
				}
				setWasModeEndedAheadOfTime(true);
				timerInfiniteProgress.value = 0;
				timerCountdownProgress.value = 0;
				timerPomodoroProgress.value = 0;
				pomodoroCurrentBreakTime.value = 0;
			}
		}
	}, [isTimerOn]);

	useEffect(() => {
		if (modeNavigation.value === "meditation") { // meditation mode timer progress
			if (isTimerOn) {
				meditationProgress.value = withRepeat(
					withTiming(1, {
						duration: 60000 / (meditationBreathPerMin.value * 2), // умножаем на два потому что вдох и выдох
						easing: Easing.linear
					}, 
					(isFinished) => {
						if (isFinished) {
							runOnJS(onMeditationFinish)();
						}
					}),
					(timerMinutes.value / 60) * meditationBreathPerMin.value * 2,
					true,
					(isFinished) => {
						if (isFinished) {
							runOnJS(onCountdownFinish)();
						}
					}
				);

				if (!meditationBreathSounds.value) {
					loadInhaleSound(breathSound, volume);
				}
			} else {
				if (wasModeEndedAheadOfTime) {
					PushNotification.localNotification(meditationEndedAheadOfTimeNotif);
				}
				setWasModeEndedAheadOfTime(true);
				breathSound.unloadAsync();
				meditationProgress.value = 0;
				meditationMode.value = inhale;
			}
		}
	}, [isTimerOn]);

	useEffect(() => {
		if (modeNavigation.value === "nap") { // nap mode timer progress
			if (isTimerOn) {
				timerCountdownProgress.value = withPause(
					withTiming(1, {
						duration: timerMinutes.value * 1000,
						easing: Easing.linear
					},
					(isFinished) => {
						if (isFinished) {
							runOnJS(onCountdownFinish)();
						}
					}),
					isTimerPaused,
				);
			} else {
				if (wasModeEndedAheadOfTime) {
					PushNotification.localNotification(napEndedAheadOfTimeNotif);
				}
				setWasModeEndedAheadOfTime(true);
				timerCountdownProgress.value = 0;
			}
		}
	}, [isTimerOn]);
	//#endregion

	if ((!wasAlarmsLoaded || !swipeTextSize) && isSignedIn) {
		return (
			<FetchDataContext.Provider
				value={{
					setSystemAlarmsObject,
					setSwipeTextSize,
				}}
			>
				<FetchData />
			</FetchDataContext.Provider>
		);
	}
	
	return (
		<SafeAreaProvider>
			<RootContext.Provider
				value={{
					alarmSound,
					
					onCountdownFinish,
					onPomodoroFinish,
					onInfiniteFinish,
					onMeditationFinish,
					pomodoroCurrentBreakTime,
					meditationMode,

					userInfo,
					setUserInfo,
					isSignedIn,
					setIsSignedIn,
					
					systemAlarmsObject,

					swipeTextSize,

					isTimerOn,
					setIsTimerOn,
					isTimerPaused,
					timerMinutes,

					volume,

					napIsAlarmOn,
					napAlarmDuration,
					napRingtone,
					napSleepModeDisabled,

					meditationBreathSounds,
					meditationVibration,
					meditationSleepModeDisabled,
					meditationBreathPerMin,

					pomodoroBreakMinutes,
					pomodoroLongBreakMinutes,
					pomodoroLongBreakEvery,
					focusFullImmersion,
					focusSleepModeDisabled,

					timerCountdownProgress,
					timerPomodoroProgress,
					timerInfiniteProgress,
					meditationProgress,

					pomodoroMinutes,
					sound,
					breathSound,
					activeModeIndex,
					setActiveModeIndex,
					infiniteTime,
					modeNavigation,
				}}
			>
				<RootNavigator />
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</RootContext.Provider>
		</SafeAreaProvider>
	);
};

export default App;
