import React, { useContext } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import FastImage, { Source } from "react-native-fast-image";
import Toast from "react-native-toast-message";
import I18n from "i18n-js";

import MainSvgView from "_atoms/MainSvgView";
import ShopDownloadButton from "_components/atoms/shop/ShopDownloadButton";
import { BLACK } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { CONTENT_PADDING, MAIN_SMALL_SVG_WIDTH } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CustomText from "_components/atoms/CustomText";
import { loadSoundFromServer, user, userDatabaseReference } from "_utils/Firebase";
import ShopListContext from "_components/context/ShopScreenContext";
import { arrayEquals } from "_utils/RootComponentUtils";
import { useStateSafe } from "_utils/useStateSafe";
import RootContext from "_components/context/RootContext";
import { setMmkvUserInfo } from "_utils/mmkv/MmkvSetFunctions";

interface MyProps {
	item: string,
	soundPrice: number,
	soundPath: Source,
	soundName: string,
	soundType: string | string[],
}

const IMAGE_WIDTH = MAIN_SMALL_SVG_WIDTH - CONTENT_PADDING * 2;
const IMAGE_HEIGHT = scaleSize(140);

const ShopSoundElement = (props: MyProps): JSX.Element => {
	const { item, soundPath, soundName, soundType } = props;
	const { userInfo, setUserInfo } = useContext(RootContext);
	const { purchases, balance, proVersion } = userInfo;
	const { height, downloadHeight, downloadedSoundNames, onDownloadEnd } = useContext(ShopListContext);
	const [soundPrice] = useStateSafe(proVersion ? 0 : props.soundPrice);
	const [downloadProgress, setDownloadProgress] = useStateSafe(0);
	const [isLoading, setIsLoading] = useStateSafe(false);
	const [isSoundPaid] = useStateSafe(soundPrice > 0);

	const isSoundPurchased = purchases.indexOf(item) !== -1;
	const isActive = downloadedSoundNames.findIndex((value) => {
		if (typeof soundType == "object" && typeof value.type == "object") {
			return value.value === item && arrayEquals(value.type, soundType);
		}
		return value.value === item && value.type === soundType;
	}) >= 0;

	const mainStyle: ViewStyle = {
		...styles.mainContainer,
		height,
		marginLeft: CONTENT_PADDING,
	};
	
	const downloadCallback = (downloadProgress: { totalBytesWritten: number, totalBytesExpectedToWrite: number }) => {
		const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
		setDownloadProgress(progress);
	};

	const onPress = () => {
		if (isSoundPurchased) {
			isActive ?
				Toast.show({
					type: "info",
					text1: I18n.t("oops"),
					text2: I18n.t("alreadyDownloadedWarn"),
					position: "bottom",
					visibilityTime: 1000,
				}) :
				(
					setIsLoading(true),
					loadSoundFromServer(item, soundType, setIsLoading, downloadCallback, onDownloadEnd)
				);
		} else {
			if (isSoundPaid) {
				if (balance - 500 >= 0) {
					const newPurchases = [...purchases, item];
		
					setUserInfo({
						...userInfo,
						balance: balance - 500,
						purchases: newPurchases,
					});
					setMmkvUserInfo({
						...userInfo,
						balance: balance - 500,
						purchases: newPurchases,
					});
					if (!user?.isAnonymous) {
						userDatabaseReference.update({
							balance: balance - 500,
							purchases: newPurchases,
						});
					}
					Toast.show({
						type: "success",
						text1: I18n.t("operationSuccess"),
						position: "bottom",
						visibilityTime: 1000,
					});
				} else {
					Toast.show({
						type: "error",
						text1: I18n.t("error"),
						text2: I18n.t("notEnoughFunds"),
						position: "bottom",
						visibilityTime: 1000,
					});
				}
			} else {
				isActive ?
					Toast.show({
						type: "info",
						text1: I18n.t("oops"),
						text2: I18n.t("alreadyDownloadedWarn"),
						position: "bottom",
						visibilityTime: 1000,
					}) :
					(
						setIsLoading(true),
						loadSoundFromServer(item, soundType, setIsLoading, downloadCallback, onDownloadEnd)
					);
			}
		}
	};

	return (
		<Pressable style={mainStyle} onPress={onPress}>
			<MainSvgView type="small" />
			<View style={[styles.imageAndTextContainer, { height }]}>
				<FastImage
					source={soundPath}
					style={styles.soundImage}
				/>
				<CustomText style={styles.soundText}>{soundName}</CustomText>
				<ShopDownloadButton
					height={downloadHeight}
					width={IMAGE_WIDTH}
					isActive={isActive}
					isLoading={isLoading}
					progress={downloadProgress}
					soundPrice={soundPrice}
					isSoundPurchased={isSoundPurchased}
				/>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: "center",
		width: MAIN_SMALL_SVG_WIDTH,
	},

	imageAndTextContainer: {
		paddingTop: CONTENT_PADDING / 1.2,
		width: MAIN_SMALL_SVG_WIDTH,
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-between",
	},

	soundImage: {
		aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
		height: IMAGE_HEIGHT,
		borderRadius: 15,
	},

	soundText: {
		fontSize: FONT_SIZE_20,
		color: BLACK,
	},
});

export default React.memo(ShopSoundElement);