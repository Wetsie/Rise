import { MMKV } from "react-native-mmkv";
import * as ImageManipulator from "expo-image-manipulator";
import { allPhoneLocales } from "_utils/Localization";
import {
	breakMinutesKey,
	downloadedSoundNamesKey,
	focusActiveModeKey,
	fullImmersionKey,
	localizationKey,
	longBreakEveryKey,
	longBreakMinutesKey,
	meditationBreathPerMinKey,
	meditationBreathSoundsKey,
	meditationSleepModeDisabledKey,
	meditationVibrationKey,
	modeChosenSoundKey,
	napIsAlarmOnKey,
	napAlarmDurationKey,
	napRingtoneKey,
	napSleepModeDisabledKey,
	sleepModeDisabledKey,
	volumeKey,
	userInfoKey,
	isSignedInKey,
	swipeTextSizeKey,
	profileImageKey,
	uploadProfileImageToServerKey,
	profileImageUriKey,
	wasHappyBirthdayToggledKey,
	systemAlarmsObjectKey
} from "./MmkvKeys";
import { ChosenSoundObject } from "_utils/ModeChosenSound";
import { UserInfo } from "_utils/UserInfo";

export const getMmkvSystemAlarmsObject = (): Record<string, string> => {
	const value = MMKV.getString(systemAlarmsObjectKey);
	return value ? JSON.parse(value) : {};
};

export const getWasHappyBirthdayToggled = (): boolean => {
	return MMKV.getBoolean(wasHappyBirthdayToggledKey);
};

export const getProfileImageUri = (): string => {
	return MMKV.getString(profileImageUriKey) ?? "";
};

export const getUploadProfileImageToServer = (): boolean => {
	return MMKV.getBoolean(uploadProfileImageToServerKey);
};

export const getProfileImage = (): ImageManipulator.ImageResult | null => {
	const value = MMKV.getString(profileImageKey);
	return value ? JSON.parse(value) : null;
};

export const getSwipeTextSize = (): number => {
	return MMKV.getNumber(swipeTextSizeKey);
};

export const getIsSignedIn = (): boolean => {
	return MMKV.getBoolean(isSignedInKey);
};

export const getUserInfo = (): UserInfo => {
	const value = MMKV.getString(userInfoKey);
	return value ? JSON.parse(value) : {};
};

export const getLocalization = (): string => {
	const value = MMKV.getString(localizationKey);
	return value ? value : allPhoneLocales[0].languageCode;
};

export const getFocusActiveMode = (): number => {
	return MMKV.getNumber(focusActiveModeKey);
};

export const getDownloadedSoundNames = (): { value: string, type: string | string[] }[] => {
	const value = MMKV.getString(downloadedSoundNamesKey);
	return value ? JSON.parse(value) : [];
};

export const getModeChosenSound = (): ChosenSoundObject => {
	const value = MMKV.getString(modeChosenSoundKey);
	return value ? JSON.parse(value) : {};
};

export const getVolume = (): { 
	value: number,
} => {
	const value = MMKV.getString(volumeKey);
	return value ? JSON.parse(value) : { value: 1 };
};

export const getFocusFullImmersion = (): boolean => {
	return MMKV.getBoolean(fullImmersionKey);
};

export const getFocusSleepModeDisabled = (): boolean => {
	return MMKV.getBoolean(sleepModeDisabledKey);
};

export const getBreakMinutes = (): number => {
	const value = MMKV.getNumber(breakMinutesKey);
	return value ? value : 5;
};

export const getLongBreakMinutes = (): number => {
	const value = MMKV.getNumber(longBreakMinutesKey);
	return value ? value : 15;
};

export const getLongBreakEvery = (): number => {
	const value = MMKV.getNumber(longBreakEveryKey);
	return value ? value : 2;
};

export const getIsAlarmOn = (): boolean => {
	return MMKV.getBoolean(napIsAlarmOnKey);
};

export const getAlarmDuration = (): number => {
	const value = MMKV.getNumber(napAlarmDurationKey);
	return value ? value : 10;
};

export const getRingtone = (): string => {
	const value = MMKV.getString(napRingtoneKey);
	return value ?? "";
};

export const getNapSleepModeDisabled = (): boolean => {
	return MMKV.getBoolean(napSleepModeDisabledKey);
};

export const getMeditationBreathSounds = (): boolean => {
	return MMKV.getBoolean(meditationBreathSoundsKey);
};

export const getMeditationVibration = (): boolean => {
	return MMKV.getBoolean(meditationVibrationKey);
};

export const getMeditationSleepModeDisabled = (): boolean => {
	return MMKV.getBoolean(meditationSleepModeDisabledKey);
};

export const getMeditationBreathPerMin = (): number => {
	const value = MMKV.getNumber(meditationBreathPerMinKey);
	return value ? value : 4;
};