import { MMKV } from "react-native-mmkv";
import * as ImageManipulator from "expo-image-manipulator";
import {
	breakMinutesKey,
	downloadedSoundNamesKey,
	focusActiveModeKey,
	fullImmersionKey,
	localizationKey,
	longBreakMinutesKey,
	longBreakEveryKey,
	meditationBreathPerMinKey,
	meditationBreathSoundsKey,
	meditationSleepModeDisabledKey,
	meditationVibrationKey,
	modeChosenSoundKey,
	napIsAlarmOnKey,
	napRingtoneKey,
	sleepModeDisabledKey,
	volumeKey,
	napSleepModeDisabledKey,
	napAlarmDurationKey,
	userInfoKey,
	isSignedInKey,
	swipeTextSizeKey,
	profileImageKey,
	uploadProfileImageToServerKey,
	profileImageUriKey,
	wasHappyBirthdayToggledKey,
	systemAlarmsObjectKey
} from "./MmkvKeys";
import { ChosenSoundObject, ChosenSoundType, ChosenSoundValue } from "_utils/ModeChosenSound";
import { UserInfo } from "_utils/UserInfo";

export const setMmkvSystemAlarmsObject = (value: Record<string, string>): void => {
	MMKV.set(systemAlarmsObjectKey, JSON.stringify(value));
};

export const setWasHappyBirthdayToggled = (value: boolean): void => {
	MMKV.set(wasHappyBirthdayToggledKey, value);
};

export const setMmkvProfileImageUri = (value: string): void => {
	MMKV.set(profileImageUriKey, value);
};

export const setMmkvUploadProfileImageToServer = (value: boolean): void => {
	MMKV.set(uploadProfileImageToServerKey, value);
};

export const setMmkvProfileImage = (value: ImageManipulator.ImageResult): void => {
	MMKV.set(profileImageKey, JSON.stringify(value));
};

export const setMmkvSwipeTextSize = (value: number): void => {
	MMKV.set(swipeTextSizeKey, value);
};

export const setMmkvIsSignedIn = (value: boolean): void => {
	MMKV.set(isSignedInKey, value);
};

export const setMmkvUserInfo = (value: UserInfo): void => {
	MMKV.set(userInfoKey, JSON.stringify(value));
};

export const setLocalization = (value: string): void => {
	MMKV.set(localizationKey, value);
};

export const setFocusActiveMode = (value: number): void => {
	MMKV.set(focusActiveModeKey, value);
};

export const setDownloadedSoundNames = (value: { value: string, type: string | string[] }[]): void => {
	MMKV.set(downloadedSoundNamesKey, JSON.stringify(value.sort()));
};

export const setModeChosenSound = (
	prevValue: ChosenSoundObject,
	type: ChosenSoundType,
	value: ChosenSoundValue,
): void => {
	if (type !== "main" && prevValue[JSON.stringify(type)] == null) {
		MMKV.set(modeChosenSoundKey, JSON.stringify({ [JSON.stringify(type)]: value, ...prevValue }));
	} else if (type !== "main") {
		prevValue[JSON.stringify(type)] = value;
		MMKV.set(modeChosenSoundKey, JSON.stringify(prevValue));
	}
};

export const setVolume = (value: { value: number }): void => {
	MMKV.set(volumeKey, JSON.stringify(value));
};

export const setFocusFullImmersion = (value: boolean): void => {
	MMKV.set(fullImmersionKey, value);
};

export const setFocusSleepModeDisabled = (value: boolean): void => {
	MMKV.set(sleepModeDisabledKey, value);
};

export const setBreakMinutes = (value: number): void => {
	MMKV.set(breakMinutesKey, value);
};

export const setLongBreakMinutes = (value: number): void => {
	MMKV.set(longBreakMinutesKey, value);
};

export const setLongBreakEvery = (value: number): void => {
	MMKV.set(longBreakEveryKey, value);
};

export const setIsAlarmOn = (value: boolean): void => {
	MMKV.set(napIsAlarmOnKey, value);
};

export const setAlarmDuration = (value: number): void => {
	MMKV.set(napAlarmDurationKey, value);
};

export const setRingtone = (value: string): void => {
	MMKV.set(napRingtoneKey, value);
};

export const setNapSleepModeDisabled = (value: boolean): void => {
	MMKV.set(napSleepModeDisabledKey, value);
};

export const setMeditationBreathSounds = (value: boolean): void => {
	MMKV.set(meditationBreathSoundsKey, value);
};

export const setMeditationVibration = (value: boolean): void => {
	MMKV.set(meditationVibrationKey, value);
};

export const setMeditationSleepModeDisabled = (value: boolean): void => {
	MMKV.set(meditationSleepModeDisabledKey, value);
};

export const setMeditationBreathPerMin = (value: number): void => {
	MMKV.set(meditationBreathPerMinKey, value);
};