/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";

import icomoon from "_root/icomoon.json";
import Line from "_atoms/TabbarIndicator";
import { scaleSize } from "_styles/mixins";
import { BLACK, GRAY, WHITE } from "_styles/colors";

const Icon = createIconSetFromIcoMoon(
	icomoon,
	"icomoon",
	"icomoon.ttf"
);
const ICON_SIZE = 28;

const screenOptions = ((props: {
    route: RouteProp<Record<string, object | undefined>, string>;
    navigation: unknown;
}): BottomTabNavigationOptions => ({
	lazy: false,
	headerShown: false,
	tabBarStyle: styles.tabbar,
	tabBarShowLabel: false,
	tabBarIcon: ({ focused }) => {
		const { route } = props;
		const iconName = focused ? route.name : `${route.name}Unactive`;

		if (focused) {
			return (
				<View style={styles.tabbarLineContainer}>
					<Icon name={iconName} style={styles.activeStyle} size={ICON_SIZE} />
					<Line />
				</View>
			);
		} else {
			return <Icon name={iconName} style={styles.inactiveStyle} size={ICON_SIZE} />;
		}
	},
}));

const styles = StyleSheet.create({
	tabbar: {
		height: 60,
		backgroundColor: WHITE,
		position: "absolute",
		borderTopWidth: 0,
		elevation: 15,
	},

	tabbarLineContainer: {
		marginTop: scaleSize(8),
		height: scaleSize(40),
		justifyContent: "space-around",
		alignItems: "center",
	},

	activeStyle: {
		color: BLACK,
	},

	inactiveStyle: {
		color: GRAY,
	},
});

export default screenOptions;
