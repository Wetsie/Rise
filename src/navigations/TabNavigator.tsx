import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "_scenes/home";
import ProfileScreen from "_scenes/profile";
import screenOptions from "_molecules/home/TabbarScreenOptions";
import ShopNavigator from "./ShopNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => {	
	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			initialRouteName="Home"
		>
			<Tab.Screen name="Shop" component={ShopNavigator} />
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default TabNavigator;