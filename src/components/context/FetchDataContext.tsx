import { createContext } from "react";
import * as ImageManipulator from "expo-image-manipulator";

const FetchDataContext = createContext<{
	setSystemAlarmsObject: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setSwipeTextSize: React.Dispatch<React.SetStateAction<number>>,
    setProfileImageProgress: React.Dispatch<React.SetStateAction<number>>,
    setProfileImage: React.Dispatch<React.SetStateAction<ImageManipulator.ImageResult | null>>,
    setUploadProfileImageToServer: React.Dispatch<React.SetStateAction<boolean>>,
    uploadProfileImageToServer: boolean,
    profileImageProgress: number,
    profileImageUri: string,
}>({
	setSystemAlarmsObject: () => { null; },
	setSwipeTextSize: () => { null; },
	setProfileImageProgress: () => { null; },
	setProfileImage: () => { null; },
	setUploadProfileImageToServer: () => { null; },
	uploadProfileImageToServer: true,
	profileImageProgress: 0,
	profileImageUri: "",
});

export default FetchDataContext;