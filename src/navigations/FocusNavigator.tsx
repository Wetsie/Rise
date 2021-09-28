import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FocusScreen from "_scenes/Focus";
import FocusSettings from "_scenes/FocusSettings";
import ModeSounds from "_scenes/ModeSounds";

const Stack = createNativeStackNavigator();

const FocusNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="Focus"
				component={FocusScreen}
			/>
			<Stack.Screen
				name="Sounds"
				component={ModeSounds}
			/>
			<Stack.Screen
				name="ModeSettings"
				component={FocusSettings}
			/>
		</Stack.Navigator>
	);
};

export default FocusNavigator;
