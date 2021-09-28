import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ShopMainScreen from "_scenes/ShopMain";
import ShopFocusScreen from "_scenes/ShopFocus";
import ShopNapScreen from "_scenes/ShopNap";
import ShopMeditationScreen from "_scenes/ShopMeditation";
import { DOWNLOAD_BUTTON_HEIGHT, WHOLE_SOUND_ELEM_HEIGHT } from "_styles/spacing";
import screenOptions from "_molecules/shop/ShopTabbarScreenOptions";
import { getDownloadedSoundNames } from "_utils/mmkv/MmkvGetFunctions";
import ShopListContext from "_components/context/ShopScreenContext";
import { useStateSafe } from "_utils/useStateSafe";

const { width, height } = Dimensions.get("window");
const TopTab = createMaterialTopTabNavigator();

const ShopNavigator = (): JSX.Element => {
	const [downloadedSoundNames, setDownloadedSoundNames] = useStateSafe(getDownloadedSoundNames());

	const onDownloadEnd = (
		newArr: {
			value: string;
			type: string | string[];
		}[]
	) => {
		setDownloadedSoundNames(newArr);
	};

	return (
		<ShopListContext.Provider
			value={{
				downloadedSoundNames,
				onDownloadEnd,
				height: WHOLE_SOUND_ELEM_HEIGHT,
				downloadHeight: DOWNLOAD_BUTTON_HEIGHT
			}}
		>
			<TopTab.Navigator
				initialLayout={{
					width,
					height,
				}}
				screenOptions={screenOptions}
			>
				<TopTab.Screen
					name="Main"
					component={ShopMainScreen}
				/>
				<TopTab.Screen
					name="Focus"
					component={ShopFocusScreen}
				/>
				<TopTab.Screen
					name="Nap"
					component={ShopNapScreen}
				/>
				<TopTab.Screen
					name="Meditation"
					component={ShopMeditationScreen}
				/>
			</TopTab.Navigator>
		</ShopListContext.Provider>
	);
};

export default ShopNavigator;
