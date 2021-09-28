import { LinkingOptions } from "@react-navigation/native";
import { Linking } from "react-native";
import { LINKING_PREFIX } from "./RootComponentUtils";

export const getLinking = (isSignedIn: boolean): LinkingOptions<ReactNavigation.RootParamList> => {
	return {
		prefixes: [LINKING_PREFIX],
		config: isSignedIn ? {
			screens: {
				HomeTab: {
					path: "home",
					screens: {
						Shop: {
							path: "shop",
						},
					},
				},
				NoMatch: "*",
			}
		} : {
			screens: {
				Welcome: {
					path: "welcome",
				},
				NoMatch: "*",
			}
		}
	};
};

export const navigateLinking = async (url: string): Promise<void> => {
	const supported = await Linking.canOpenURL(LINKING_PREFIX +  url);

	if (supported) {
		await Linking.openURL(LINKING_PREFIX + url);
	}
};