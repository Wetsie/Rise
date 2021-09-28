import * as ImagePicker from "expo-image-picker";
import { PermissionsAndroid } from "react-native";

export const pickProfileImage = async (callback: (uri: string) => void): Promise<void> => {
	const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
	if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 6],
			quality: 1,
		});

		if (!result.cancelled) {
			callback(result.uri);
		}
	}
};