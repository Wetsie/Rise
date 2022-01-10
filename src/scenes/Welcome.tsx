/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import RootContext from "_components/context/RootContext";
import { setMmkvIsSignedIn, setMmkvUserInfo } from "_utils/mmkv/MmkvSetFunctions";
import { userDatabaseReference } from "_utils/Firebase";
import CreateChangeUserData from "_components/molecules/create/CreateChangeUserData";

const Welcome = (): JSX.Element => {
	const {
		setIsSignedIn,
		setUserInfo,
	} = useContext(RootContext);

	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				return true;
			};
    
			BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
			return () =>
				BackHandler.removeEventListener("hardwareBackPress", onBackPress);
		}, [])
	);

	const onPress = async (name: string, surname: string, birthdate: Date | null) => {
		const capitName = name[0].toUpperCase() + name.substring(1);
		const capitSurname = surname[0].toUpperCase() + surname.substring(1);
		
		setUserInfo({
			firstName: capitName,
			lastName: capitSurname,
			dateOfBirth: (birthdate as Date).toLocaleDateString(),
			balance: 0,
			purchases: ["undefined"],
			proVersion: false,
			stat: {
				focus: 0,
				meditation: 0,
				nap: 0,
			}
		});
		setMmkvUserInfo({
			firstName: capitName,
			lastName: capitSurname,
			dateOfBirth: (birthdate as Date).toLocaleDateString(),
			balance: 0,
			purchases: ["undefined"],
			proVersion: false,
			stat: {
				focus: 0,
				meditation: 0,
				nap: 0,
			}
		});

		userDatabaseReference.update({
			firstName: capitName,
			lastName: capitSurname,
			dateOfBirth: (birthdate as Date).toLocaleDateString(),
			balance: 0,
			purchases: ["undefined"],
			proVersion: false,
			stat: {
				focus: 0,
				meditation: 0,
				nap: 0,
			}
		});

		setMmkvIsSignedIn(true);
		setIsSignedIn(true);
	};

	return (
		<CreateChangeUserData onPress={onPress} />
	);
};

export default Welcome;
