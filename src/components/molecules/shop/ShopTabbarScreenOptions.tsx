/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { TextStyle, View, Dimensions, StyleSheet } from "react-native";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/core";
import I18n from "i18n-js";

import Line from "_components/atoms/TabbarIndicator";
import { BLACK, GRAY, LBLUE, WHITE } from "_styles/colors";
import CustomText from "_components/atoms/CustomText";
import { FONT_SIZE_20 } from "_styles/typography";
import { center, scaleSize } from "_styles/mixins";
import { STATUS_HEIGHT } from "_styles/spacing";

const { width } = Dimensions.get("window");
const TAB_HEIGHT = scaleSize(60) + STATUS_HEIGHT;
const MARGIN_SIZE = scaleSize(20);

const screenOptions = ((props: {
    route: RouteProp<Record<string, object | undefined>, string>;
    navigation: unknown;
}): MaterialTopTabNavigationOptions => ({
	lazy: true,
	lazyPreloadDistance: 1,
	lazyPlaceholder: () => <View style={styles.lazyPlaceholder} />,
	swipeEnabled: true,
	tabBarPressColor: WHITE,
	tabBarStyle: styles.tabBarStyle,
	tabBarItemStyle: styles.tabBarItemStyle,
	tabBarIconStyle: center,
	tabBarShowLabel: true,
	tabBarShowIcon: true,
	tabBarScrollEnabled: true,
	tabBarIndicator: () => null,
	tabBarLabel: function label ({ focused }) {
		const { route } = props;
		let text = "";
		let margin: TextStyle = { };

		switch (route.name) {
		case "Main":
			margin = { marginLeft: MARGIN_SIZE };
			text = I18n.t("shopMainCategory");
			break;
		case "Focus":
			text = I18n.t("focus");
			break;
		case "Nap":
			text = I18n.t("nap");
			break;
		case "Meditation":
			margin = { marginRight: MARGIN_SIZE };
			text = I18n.t("meditation");
			break;
		}

		return (
			<CustomText style={{ fontSize: FONT_SIZE_20, color: focused ? BLACK : GRAY, ...margin }}>{text}</CustomText>
		);
	},
	tabBarIcon: function icon ({ focused }) {
		const { route } = props;
		let margin: TextStyle = { };

		switch (route.name) {
		case "Main":
			margin = { marginLeft: MARGIN_SIZE };
			break;
		case "Meditation":
			margin = { marginRight: MARGIN_SIZE };
			break;
		}

		return (
			<View style={{ opacity: focused ? 1 : 0, ...margin }}>
				<Line />
			</View>
		);
	},
}));

const styles = StyleSheet.create({
	tabBarItemStyle: {
		flexDirection: "column-reverse",
		justifyContent: "space-around",
		height: TAB_HEIGHT / 1.7,
		width: "auto",
	},

	tabBarStyle: {
		aspectRatio: width / TAB_HEIGHT,
		height: TAB_HEIGHT,
		backgroundColor: WHITE,
		justifyContent: "flex-end",
		elevation: 5,
	},

	lazyPlaceholder: {
		flex: 1,
		backgroundColor: LBLUE,
	},
});

export default screenOptions;
