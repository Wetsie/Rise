import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import auth from "@react-native-firebase/auth";

import AuthIntroduction1 from "_scenes/AuthIntroduction1";
import AuthIntroduction2 from "_scenes/AuthIntroduction2";
import AuthIntroduction3 from "_scenes/AuthIntroduction3";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Registration from "_scenes/Registration";
import Welcome from "_scenes/Welcome";
import { navigateLinking } from "_utils/linking";
import RootContext from "_components/context/RootContext";
import { setMmkvIsSignedIn, setMmkvUserInfo } from "_utils/mmkv/MmkvSetFunctions";
import { userDatabaseReference } from "_utils/Firebase";

const { width, height } = Dimensions.get("window");
const TopTab = createMaterialTopTabNavigator();

const AuthNavigator = (): JSX.Element => {
	const { setIsSignedIn, setUserInfo } = useContext(RootContext);

	useEffect(() => {
		auth().onAuthStateChanged(async (user) => {
			if (user) {
				const userData = (await userDatabaseReference.once("value")).val();

				if (userData) {
					setUserInfo(userData);
					setMmkvUserInfo(userData);

					setMmkvIsSignedIn(true);
					setIsSignedIn(true);
				} else {
					navigateLinking("welcome");
				}
			}
		});
	}, []);

	return (
		<TopTab.Navigator
			tabBar={() => null}
			initialLayout={{
				width,
				height,
			}}
			screenOptions={{
				swipeEnabled: false,
			}}
		>
			<TopTab.Screen
				name="AuthIntroduction1"
				component={AuthIntroduction1}
			/>
			<TopTab.Screen
				name="AuthIntroduction2"
				component={AuthIntroduction2}
			/>
			<TopTab.Screen
				name="AuthIntroduction3"
				component={AuthIntroduction3}
			/>
			<TopTab.Screen
				name="Registration"
				component={Registration}
			/>
			<TopTab.Screen
				name="Welcome"
				component={Welcome}
			/>
		</TopTab.Navigator>
	);
};

export default AuthNavigator;
