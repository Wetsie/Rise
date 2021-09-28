import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MeditationScreen from "_scenes/Meditation";
import MeditationSettings from "_scenes/MeditationSettings";
import ModeSounds from "_scenes/ModeSounds";

const Stack = createNativeStackNavigator();

const MeditationStack = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="Meditation"
				component={MeditationScreen}
			/>
			<Stack.Screen
				name="Sounds"
				component={ModeSounds}
			/>
			<Stack.Screen
				name="ModeSettings"
				component={MeditationSettings}
			/>
		</Stack.Navigator>
	);
};

export default MeditationStack;
