import React, { useRef, useContext } from "react";
import { Modalize } from "react-native-modalize";
import { useSharedValue } from "react-native-reanimated";
import I18n from "i18n-js";

import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import CreateModeSettings from "_components/molecules/create/CreateModeSettings";
import { setMeditationBreathPerMin, setMeditationBreathSounds, setMeditationSleepModeDisabled, setMeditationVibration } from "_utils/mmkv/MmkvSetFunctions";
import { SettingsDataType } from "_utils/ModeSettingsProps";
import RootContext from "_components/context/RootContext";

const arrayToMap: number[] = [...Array(7)].map((_, i) => (i + 1) + 3);

const MeditationSettings = (): JSX.Element => {
	const {
		meditationBreathPerMin,
		meditationBreathSounds,
		meditationVibration,
		meditationSleepModeDisabled
	} = useContext(RootContext);
	const optionKey = useSharedValue(0);
	const modalHeader = useSharedValue("");
	const modalRef = useRef<Modalize>(null);

	const onOptionPress = (text: string, key: number) => {
		modalHeader.value = text;
		optionKey.value = key;
		modalRef.current?.open();
	};

	const onOverlayPress = () => {
		modalRef.current?.close();
		setMeditationBreathPerMin(meditationBreathPerMin.value);
	};

	const data: SettingsDataType[] = [
		{
			text: I18n.t("balancedBreath"),
			valueToChange: meditationBreathPerMin,
			valueInfoToShow: I18n.t("perMin")
		},
		{
			text: I18n.t("breathSounds"),
			valueToChange: meditationBreathSounds,
			boolSetFunc: setMeditationBreathSounds,
		},
		{
			text: I18n.t("vibration"),
			valueToChange: meditationVibration,
			boolSetFunc: setMeditationVibration,
		},
		{
			text: I18n.t("screenOn"),
			valueToChange: meditationSleepModeDisabled,
			boolSetFunc: setMeditationSleepModeDisabled,
		},
	];

	const sectionItemsAmount = {
		balancedBreath: 3,
		advanced: 1,
	};

	return (
		<CreateModeSettingsContext.Provider
			value={{
				onOverlayPress,
				onOptionPress,
				modalRef,
				modalHeader,
				sectionItemsAmount,
				arrayToMap,
				optionKey,
				data,
			}}
		>
			<CreateModeSettings />
		</CreateModeSettingsContext.Provider>
	);
};

export default MeditationSettings;
