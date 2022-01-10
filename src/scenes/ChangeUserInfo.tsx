import React, { useContext } from "react";
import RNRestart from "react-native-restart";

import RootContext from "_components/context/RootContext";
import { setMmkvUserInfo } from "_utils/mmkv/MmkvSetFunctions";
import { user, userDatabaseReference } from "_utils/Firebase";
import CreateChangeUserData from "_components/molecules/create/CreateChangeUserData";

const ChangeUserInfo = (): JSX.Element => {
	const { userInfo } = useContext(RootContext);
	const { firstName, lastName, dateOfBirth, stat, balance, purchases, proVersion } = userInfo;
	const { focus, meditation, nap } = stat;

	const onPress = async (name: string, surname: string, birthdate: Date | null) => {
		const capitName = name === "" ? null : name[0].toUpperCase() + name.substring(1);
		const capitSurname = surname === "" ? null : surname[0].toUpperCase() + surname.substring(1);

		const newUserInfo = {
			firstName,
			lastName,
			dateOfBirth,
			balance,
			purchases,
			proVersion,
			stat: {
				focus,
				meditation,
				nap,
			}
		};

		if (capitName) {
			newUserInfo.firstName = capitName;
		}
		if (capitSurname) {
			newUserInfo.lastName = capitSurname;
		}
		if (birthdate) {
			newUserInfo.dateOfBirth = birthdate.toLocaleDateString();
		}

		setMmkvUserInfo(newUserInfo);
		if (!user?.isAnonymous) {
			userDatabaseReference.update(newUserInfo);
		}
		RNRestart.Restart();
	};

	return (
		<CreateChangeUserData onPress={onPress} />
	);
};

export default ChangeUserInfo;
