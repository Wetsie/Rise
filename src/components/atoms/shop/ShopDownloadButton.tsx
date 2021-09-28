import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import ShopDownloadSvgArrow from "./ShopDownloadSvgArrow";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import { center } from "_styles/mixins";
import { BLACK, DBLUE, WHITE } from "_styles/colors";
import { FONT_SIZE_16 } from "_styles/typography";
import ShopDownloadSvgCheckMark from "./ShopDownloadSvgCheckMark";
import SoundProgressBar from "_components/molecules/modes/SoundProgressBar";
import { useStateSafe } from "_utils/useStateSafe";
import RootContext from "_components/context/RootContext";
import Coin from "../profile/Coin";

const ShopDownloadButton = ({ height, width, isActive, isLoading, progress, soundPrice, isSoundPurchased }: {
	height: number,
	width: number,
	isActive: boolean,
	isLoading: boolean,
	progress: number,
	soundPrice: number,
	isSoundPurchased: boolean,
}): JSX.Element => {
	const { userInfo } = useContext(RootContext);
	const [isSoundPaid] = useStateSafe(soundPrice > 0);
	const [currentTextToDisplay, setCurrentTextToDisplay] = useStateSafe(isSoundPaid ? soundPrice : I18n.t("shopDownloadButton"));

	useEffect(() => {
		if (isSoundPurchased) {
			setCurrentTextToDisplay(I18n.t("shopDownloadButton"));
		}
	}, [userInfo]);

	return (
		<View style={styles.downloadButtonContainer}>
			<CreateSvgView
				height={height}
				width={width}
				color={isActive ? DBLUE : BLACK}
			/>
			<View style={styles.buttonDownloadContainer}>
				{
					isLoading ?
						<SoundProgressBar progress={progress} /> :
						<>
							<View style={styles.downloadTextContainer}>
								<CustomText style={styles.downloadText}>{isActive ? I18n.t("shopDownloadedButton") : currentTextToDisplay}</CustomText>
								{(isSoundPaid && !isSoundPurchased) && <Coin />}
							</View>
							{
								(isSoundPaid && !isSoundPurchased) ?
									null :
									isActive ?
										<ShopDownloadSvgCheckMark /> :
										<ShopDownloadSvgArrow />
							}
						</>
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	downloadButtonContainer: {
		...center,
	},

	buttonDownloadContainer: {
		position: "absolute",
		alignItems: "center",
		flexDirection: "row",
	},

	downloadTextContainer: {
		alignItems: "center",
		flexDirection: "row",
	},

	downloadText: {
		fontSize: FONT_SIZE_16,
		color: WHITE,
	}
});

export default ShopDownloadButton;
