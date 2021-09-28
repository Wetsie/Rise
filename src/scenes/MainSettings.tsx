import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ExtraDimensions from "react-native-extra-dimensions-android";
import Modal from "react-native-modal";
import I18n from "i18n-js";

import { BLACK, WHITE } from "_styles/colors";
import { CONTENT_PADDING, HOME_TOP_PADDING, STATUS_HEIGHT } from "_styles/spacing";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import { onSettingsItemPress, settingsArray } from "_utils/MainSettingsUtils";
import { useStateSafe } from "_utils/useStateSafe";
import CustomText from "_components/atoms/CustomText";
import { FONT_SIZE_16 } from "_styles/typography";

const MainSettingsScreen = (): JSX.Element => {
	const [modalVisible, setModalVisible] = useStateSafe(false);
	const navigation = useNavigation();

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<CreateGoBackView goBackText={I18n.t("settings")} />
			{settingsArray.map((item, key) => {
				return (
					<View style={[styles.mapElement, { marginTop: !key ? HOME_TOP_PADDING : 0 }]} key={key}>
						<Pressable onPress={() => onSettingsItemPress(key, navigation, openModal)} >
							{item}
						</Pressable>
					</View>
				);
			})}
			<Modal
				isVisible={modalVisible}
				backdropColor={BLACK}
				deviceHeight={ExtraDimensions.getRealWindowHeight()}
				onBackButtonPress={closeModal}
				onBackdropPress={closeModal}
				statusBarTranslucent={true}
				useNativeDriverForBackdrop
				useNativeDriver
			>
				<CustomText style={styles.modalText}>{I18n.t("aboutMeText")}</CustomText>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: WHITE,
		paddingTop: -STATUS_HEIGHT,
	},

	mapElement: {
		marginHorizontal: CONTENT_PADDING,
		paddingVertical: HOME_TOP_PADDING / 1.5,
	},

	modalText: {
		fontSize: FONT_SIZE_16,
		backgroundColor: WHITE,
		padding: HOME_TOP_PADDING,
		borderRadius: 15
	}
});

export default MainSettingsScreen;
