import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountSettingsScreen from "_scenes/AccountSettings";
import ChangeUserInfo from "_scenes/ChangeUserInfo";

const Stack = createNativeStackNavigator();

const AccountNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationTypeForReplace: "push",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="AccountSettings"
				component={AccountSettingsScreen}
			/>
			<Stack.Screen
				name="ChangeUserInfo"
				component={ChangeUserInfo}
			/>
		</Stack.Navigator>
	);
};

export default AccountNavigator;
