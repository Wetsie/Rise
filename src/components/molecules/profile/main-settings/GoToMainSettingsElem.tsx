import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfileSettingsIcon from "_components/atoms/profile/ProfileSettingsIcon";
import { GRAY } from "_styles/colors";

const GoToMainSettingsElem = (): JSX.Element => {
	const navigation = useNavigation();

	return (
		<Pressable
			style={styles.button}
			hitSlop={30}
			onPress={() => navigation.navigate("MainSettingsNavigator")}
			android_ripple={{ color: GRAY, radius: 15 }}
		>
			<ProfileSettingsIcon />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 15,
	}
});

export default GoToMainSettingsElem;