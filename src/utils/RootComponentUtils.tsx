/* eslint-disable @typescript-eslint/no-var-requires */
import { Audio } from "expo-av";
import { FontSource, loadAsync } from "expo-font";
import Animated from "react-native-reanimated";
import { FileSystem } from "react-native-unimodules";
import * as ImageManipulator from "expo-image-manipulator";
import auth from "@react-native-firebase/auth";
import { UserInfo } from "./UserInfo";

export const IMMERSIVE_MODE_SECONDS = 10000;
export const LINKING_PREFIX = "rise://app/";

const uid = auth().currentUser?.uid ?? "";
export const PROFILE_IMAGE = FileSystem.documentDirectory + uid + ".png";

export const setAudioMode = async (): Promise<void> => {
	await Audio.setAudioModeAsync({
		playsInSilentModeIOS: true,
		staysActiveInBackground: true,
		interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		shouldDuckAndroid: false,
		interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
	});
};

export const loadFonts = async (
	fonts: string | { [fontFamily: string]: FontSource },
	setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,

): Promise<void> => {
	await loadAsync(fonts);
	setIsLoaded(true);
};

export const getSoundVolumeWhenBreathIsOn = (volume: Animated.SharedValue<number>): number => {
	return volume.value - 0.3;
};

export const getBreathSoundVolume = (volume: Animated.SharedValue<number>): number => {
	return volume.value > 0.7 ?
		1 :
		volume.value > 0.4 ?
			0.8 :
			volume.value === 0 ?
				0 :
				0.5;
};

export const loadInhaleSound = async (sound: Audio.Sound, volume: Animated.SharedValue<number>): Promise<void> => {
	await sound.loadAsync(
		require("_assets/sounds/BreathInhale.mp3"),
		{
			isLooping: true,
			shouldPlay: true,
			volume: getBreathSoundVolume(volume),
		}
	);
};

export const loadExhaleSound = async (sound: Audio.Sound, volume: Animated.SharedValue<number>): Promise<void> => {
	await sound.loadAsync(
		require("_assets/sounds/BreathExhale.mp3"),
		{
			isLooping: true,
			shouldPlay: true,
			volume: getBreathSoundVolume(volume),
		}
	);
};

export const arrayEquals = (arr1: unknown[], arr2: unknown[]): boolean => {
	if (!arr2)
		return false;
	
	if (arr1.length != arr2.length)
		return false;
	
	for (let i = 0, l = arr1.length; i < l; i++) {
		if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
			if (arrayEquals(arr1[i] as unknown[], arr2[i] as unknown[]))
				return false;
		}
		else if (arr1[i] != arr2[i]) {
			return false;   
		}           
	}       
	return true;
};

export interface ModesRelatedType {
	onCountdownFinish: () => void,
	onPomodoroFinish: () => void,
	onInfiniteFinish: () => void,
	onMeditationFinish: () => void,
	pomodoroCurrentBreakTime: Animated.SharedValue<number>,
	meditationMode: Animated.SharedValue<string>,
	
	setProfileImage: React.Dispatch<React.SetStateAction<ImageManipulator.ImageResult | null>>,

	setUploadProfileImageToServer: React.Dispatch<React.SetStateAction<boolean>>,
	profileImageUri: string,
	setProfileImageUri: React.Dispatch<React.SetStateAction<string>>,
	profileImage: ImageManipulator.ImageResult | null,
	userInfo: UserInfo,
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
	isSignedIn: boolean,
	setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
	systemAlarmsObject: Record<string, string>,
	
	swipeTextSize: number,
	
	isTimerOn: boolean,
	setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>,
	isTimerPaused: Animated.SharedValue<boolean>,
	timerMinutes: Animated.SharedValue<number>,

	volume: Animated.SharedValue<number>,

	meditationBreathSounds: Animated.SharedValue<boolean>,
	meditationVibration: Animated.SharedValue<boolean>,
	meditationSleepModeDisabled: Animated.SharedValue<boolean>,
	meditationBreathPerMin: Animated.SharedValue<number>,

	napIsAlarmOn: Animated.SharedValue<boolean>,
	napAlarmDuration: Animated.SharedValue<number>,
	napRingtone: Animated.SharedValue<string>,
	napSleepModeDisabled: Animated.SharedValue<boolean>,

	pomodoroBreakMinutes: Animated.SharedValue<number>,
	pomodoroLongBreakMinutes: Animated.SharedValue<number>,
	pomodoroLongBreakEvery: Animated.SharedValue<number>,
	focusFullImmersion: Animated.SharedValue<boolean>,
	focusSleepModeDisabled: Animated.SharedValue<boolean>,

	timerCountdownProgress: Animated.SharedValue<number>,
	timerPomodoroProgress: Animated.SharedValue<number>,
	timerInfiniteProgress: Animated.SharedValue<number>,
	meditationProgress: Animated.SharedValue<number>,

	pomodoroMinutes: Animated.SharedValue<number>,
	modeNavigation: Animated.SharedValue<"focus" | "meditation" | "nap" | "">,
	sound: Audio.Sound,
	breathSound: Audio.Sound,
	activeModeIndex: number,
	setActiveModeIndex: React.Dispatch<React.SetStateAction<number>>,
	infiniteTime: Animated.SharedValue<number>,
}