import React from "react";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { FileSystem } from "react-native-unimodules";
import { getDownloadedSoundNames, getModeChosenSound } from "./mmkv/MmkvGetFunctions";
import { setModeChosenSound, setDownloadedSoundNames } from "./mmkv/MmkvSetFunctions";
import { ChosenSoundType, ChosenSoundValue } from "./ModeChosenSound";

export const firebaseConfig = {
	apiKey: "AIzaSyASh-eWm-ekUZNw_vTTLFWpYW9n2ZmV6gA",
	authDomain: "riseprojectv2.firebaseapp.com",
	databaseURL: "https://riseprojectv2-default-rtdb.europe-west1.firebasedatabase.app/",
	projectId: "riseprojectv2",
	storageBucket: "gs://riseprojectv2.appspot.com/",
	messagingSenderId: "409416193141",
	appId: "1:409416193141:android:a4ae82b56cdae922a9943c",
	measurementId: "G-2393748170",
};

const storageRef = storage().ref();

export const logOut = (callback: () => void): void => {
	auth()
		.signOut()
		.then(callback);
};

export const deleteAccount = (callback: () => void): void => {
	const storageRef = storage().ref("/images/" + user?.uid);

	storageRef.delete().then(() => {
		userDatabaseReference.remove().then(() => {
			user?.delete().then(callback);
		});
	});
};

export const loadProfileImageFromServer = (callback: (url: string) => void, onEnd: () => void): void => {
	const uid = user?.uid ?? "";

	storageRef.child("images/" + uid).getDownloadURL()
		.then(async url => {
			callback(url);
		})
		.finally(onEnd);
};

export const user = auth().currentUser;
export const userDatabaseReference = database().ref("/users/" + user?.uid);

export const loadSoundFromServer = (
	soundName: ChosenSoundValue,
	soundType: ChosenSoundType,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	downloadCallback: (downloadProgress: { totalBytesWritten: number, totalBytesExpectedToWrite: number }) => void,
	onEnd: (
		newArr: {
			value: string;
			type: string | string[];
		}[]
	) => void
): void => {
	const soundNames = getDownloadedSoundNames();
	const chosenSound = getModeChosenSound();

	storageRef.child("sounds/" + soundName + ".mp3").getDownloadURL()
		.then(async url => {
			const downloadResumable = FileSystem.createDownloadResumable(
				url,
				FileSystem.documentDirectory + soundName + ".mp3",
				{},
				downloadCallback
			);

			await downloadResumable.downloadAsync();
		})
		.finally(() => {
			if (
				Object.keys(chosenSound).findIndex(value => {
					return JSON.parse(value).includes(soundType) || JSON.parse(value) === soundType;
				}) === -1
			) {
				setModeChosenSound(chosenSound, soundType, soundName);
			}
			setDownloadedSoundNames([
				...soundNames,
				{
					value: soundName,
					type: soundType,
				}
			]);
			onEnd([
				...soundNames,
				{
					value: soundName,
					type: soundType,
				}
			]);
			setIsLoading(false);
		});
};