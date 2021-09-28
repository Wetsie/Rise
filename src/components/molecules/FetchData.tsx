import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { Asset } from "react-native-unimodules";

import * as ImageManipulator from "expo-image-manipulator";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

import CustomText from "_components/atoms/CustomText";
import FetchDataContext from "_components/context/FetchDataContext";
import { DBLUE } from "_styles/colors";
import { FONT_SIZE_50 } from "_styles/typography";
import { setMmkvProfileImage, setMmkvSwipeTextSize, setMmkvSystemAlarmsObject, setMmkvUploadProfileImageToServer } from "_utils/mmkv/MmkvSetFunctions";
import { loadProfileImageFromServer } from "_utils/Firebase";
import AlarmModule from "_utils/nativeModules/AlarmModule";

const FetchData = (): JSX.Element => {
	const {
		setSystemAlarmsObject,
		setSwipeTextSize,
		setProfileImageProgress,
		setProfileImage,
		setUploadProfileImageToServer,
		systemAlarmsObject,
		profileImageProgress,
		uploadProfileImageToServer,
		profileImageUri,
	} = useContext(FetchDataContext);

	const user = auth().currentUser;
	const storageRef = storage().ref("/images/" + user?.uid);

	useEffect(() => {
		if (profileImageProgress === 1) { // download a photo from the server, if the upload to the server is finished
			if (!Object.keys(systemAlarmsObject).length) {
				AlarmModule.getAlarms(data => {
					setSystemAlarmsObject(data);
					setMmkvSystemAlarmsObject(data);
				});
			}
			loadProfileImageFromServer(
				(url) => {
					const image = Asset.fromModule(url);
					(
						async () => await image.downloadAsync()
					)()
						.then(async () => {
							const manipResult = await ImageManipulator.manipulateAsync(
								image.localUri || image.uri,
								[],
								{ compress: 1, format: ImageManipulator.SaveFormat.JPEG }
							);
							setProfileImage(manipResult); // convert the photo to JPEG and save it
							setMmkvProfileImage(manipResult);
						});
				},
				() => {
					setProfileImageProgress(0);
					setUploadProfileImageToServer(false);
					setMmkvUploadProfileImageToServer(false);
				}
			);
		}
	}, [profileImageProgress]);

	useEffect(() => {
		if (uploadProfileImageToServer && profileImageUri !== "") { // upload the photo to the server, if needed
			(
				async () => {
					const stat = RNFetchBlob.fs.stat(profileImageUri);
					const task = storageRef.putFile((await stat).path);
					task.on("state_changed", null, null, () => setProfileImageProgress(1));
				}
			)();
		} else if (profileImageUri === "") {
			setProfileImageProgress(1);
		}
	}, [uploadProfileImageToServer, profileImageUri]);

	return (
		<View
			onLayout={(event) => {
				setSwipeTextSize(event.nativeEvent.layout.height); // swipe text size
				setMmkvSwipeTextSize(event.nativeEvent.layout.height);
			}}
		>
			<CustomText type="demi" style={styles.textMeasurement50}>180</CustomText>
		</View>
	);
};

const styles = StyleSheet.create({
	textMeasurement50: {
		opacity: 0,
		fontSize: FONT_SIZE_50,
		color: DBLUE
	},
});

export default FetchData;
