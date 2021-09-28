import React, { useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RootContext from "_components/context/RootContext";
import ModeSounds from "_scenes/ModeSounds";
import NapScreen from "_scenes/Nap";
import NapSettings from "_scenes/NapSettings";

const Stack = createNativeStackNavigator();

const NapStack = (): JSX.Element => {
	const { napRingtone, systemAlarmsObject } = useContext(RootContext);

	useFocusEffect(
		useCallback(() => {
			napRingtone.value = Object.keys(systemAlarmsObject).sort()[0];
		}, [])
	);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="Nap"
				component={NapScreen}
			/>
			<Stack.Screen
				name="Sounds"
				component={ModeSounds}
			/>
			<Stack.Screen
				name="ModeSettings"
				component={NapSettings}
			/>
		</Stack.Navigator>
	);
};

export default NapStack;
