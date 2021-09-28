import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ModeBottomBar from "../modes/ModeBottomBar";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import ModeContent from "_molecules/modes/ModeContent";
import { screenMainContainerStyle } from "_styles/spacing";

const CreateModeScreen = (): JSX.Element => {
	const { goBack: GoBack, background: Background, modal } = useContext(CreateModeScreenContext);
	const { element: Modal, onPress } = modal;

	return (
		<SafeAreaView style={screenMainContainerStyle}>
			<Background />
			<GoBack />
			<ModeContent />
			<ModeBottomBar onPress={onPress} />
			<Modal />
		</SafeAreaView>
	);
};

export default CreateModeScreen;
