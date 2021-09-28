import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfileSettingsIcon from "_components/atoms/profile/ProfileSettingsIcon";

const GoToMainSettingsElem = (): JSX.Element => {
	const navigation = useNavigation();

	return (
		<Pressable hitSlop={30} onPress={() => navigation.navigate("MainSettingsNavigator")}>
			<ProfileSettingsIcon />
		</Pressable>
	);
};

export default GoToMainSettingsElem;