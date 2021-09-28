import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FocusNavigator from "./FocusNavigator";
import MainSettingsNavigator from "./MainSettingsNavigator";
import MeditationStack from "./MeditationNavigator";
import NapStack from "./NapNavigator";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "fade_from_bottom"
			}}
		>
			<Stack.Screen
				name="HomeTab"
				component={TabNavigator}
			/>
			<Stack.Screen
				name="MainSettingsNavigator"
				component={MainSettingsNavigator}
			/>
			<Stack.Screen
				name="FocusNavigator"
				component={FocusNavigator}
			/>
			<Stack.Screen
				name="MeditationNavigator"
				component={MeditationStack}
			/>
			<Stack.Screen
				name="NapNavigator"
				component={NapStack}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
