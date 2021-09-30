import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import I18n from "i18n-js";

import CreateSvgView from "_components/molecules/create/CreateSvgView";
import { BLACK, DBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_16, FONT_SIZE_24 } from "_styles/typography";
import { navigateLinking } from "_utils/linking";
import CustomText from "../CustomText";
import RootContext from "_components/context/RootContext";

const NoSoundsButton = (): JSX.Element => {
	const { modeNavigation } = useContext(RootContext);

	return (
		<View style={styles.mainContainer}>
			<CreateSvgView
				width={scaleSize(300)}
				height={scaleSize(160)}
				color={WHITE}
			/>
			<CustomText style={styles.noSoundsText}>{I18n.t("noSounds")}</CustomText>
			<View style={styles.soundShopMainContainer}>
				<Pressable onPress={() => navigateLinking("home/shop/" + modeNavigation.value)} style={styles.soundShopChildContainer}>
					<CreateSvgView
						width={scaleSize(260)}
						height={scaleSize(36)}
						color={DBLUE}
					/>
					<CustomText style={styles.soundShopText}>{I18n.t("soundShop")}</CustomText>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
    
	noSoundsText: {
		fontSize: FONT_SIZE_24,
		position: "absolute",
		color: BLACK
	},

	soundShopMainContainer: {
		width: scaleSize(300),
		height: scaleSize(160) + scaleSize(36),
		justifyContent: "flex-end",
		alignItems: "center",
		position: "absolute",
	},

	soundShopChildContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	soundShopText: {
		fontSize: FONT_SIZE_16,
		position: "absolute",
		color: WHITE
	},
});

export default NoSoundsButton;
