import React, { useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ExtraDimensions from "react-native-extra-dimensions-android";
import Modal from "react-native-modal";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import RootContext from "_components/context/RootContext";
import { getLinking } from "_utils/linking";
import { BLACK } from "_styles/colors";
import { useStateSafe } from "_utils/useStateSafe";
import HappyBirthdayModal from "_components/atoms/modes/HappyBirthdayModal";
import { setWasHappyBirthdayToggled } from "_utils/mmkv/MmkvSetFunctions";
import { getWasHappyBirthdayToggled } from "_utils/mmkv/MmkvGetFunctions";

const RootNavigator = (): JSX.Element => {
	const { isSignedIn, userInfo } = useContext(RootContext);
	const [modalVisible, setModalVisible] = useStateSafe(false);

	useEffect(() => {
		if (userInfo.dateOfBirth === new Date().toLocaleDateString() && !getWasHappyBirthdayToggled()) {
			setModalVisible(true);
		}
	}, []);

	const closeModal = () => {
		setModalVisible(false);
		setWasHappyBirthdayToggled(true);
	};
	
	return (
		<NavigationContainer linking={getLinking(isSignedIn)}>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
			{
				isSignedIn ?
					<AppNavigator /> :
					<AuthNavigator />
			}
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
				<HappyBirthdayModal />
			</Modal>
		</NavigationContainer>
	);
};

export default RootNavigator;
