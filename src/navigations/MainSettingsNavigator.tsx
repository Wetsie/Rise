import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSettingsScreen from "_scenes/MainSettings";
import LanguageSettingsScreen from "_scenes/LanguageSettings";
import AccountNavigator from "./AccountNavigator";

const Stack = createNativeStackNavigator();

const MainSettingsNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="MainSettings"
				component={MainSettingsScreen}
			/>
			<Stack.Screen
				name="AccountSettingsNavigator"
				component={AccountNavigator}
			/>
			<Stack.Screen
				name="LanguageSettings"
				component={LanguageSettingsScreen}
			/>
		</Stack.Navigator>
	);
};

export default MainSettingsNavigator;
