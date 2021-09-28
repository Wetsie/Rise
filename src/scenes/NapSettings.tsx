import React, { useRef, useContext } from "react";
import { Modalize } from "react-native-modalize";
import { useSharedValue } from "react-native-reanimated";
import I18n from "i18n-js";

import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import CreateModeSettings from "_components/molecules/create/CreateModeSettings";
import { setAlarmDuration, setIsAlarmOn, setNapSleepModeDisabled, setRingtone } from "_utils/mmkv/MmkvSetFunctions";
import RootContext from "_components/context/RootContext";
import { SettingsDataType } from "_utils/ModeSettingsProps";
import { useStateSafe } from "_utils/useStateSafe";

const napDurArray = [...Array(11)].map((_, i) => 5 * (i + 1) + 5);

const NapSettings = (): JSX.Element => {
	const { napIsAlarmOn, napRingtone, napAlarmDuration, systemAlarmsObject, napSleepModeDisabled } = useContext(RootContext);
	const optionKey = useSharedValue(0);
	const modalHeader = useSharedValue("");
	const modalRef = useRef<Modalize>(null);
	const [arrayToMap, setArrayToMap] = useStateSafe<number[] | string[]>([]);

	const onOptionPress = (text: string, key: number) => {
		modalHeader.value = text;
		optionKey.value = key;
		modalRef.current?.open();

		setArrayToMap(key === 1 ? Object.keys(systemAlarmsObject).sort() : napDurArray);
	};

	const onOverlayPress = () => {
		modalRef.current?.close();
		setRingtone(napRingtone.value);
		setAlarmDuration(napAlarmDuration.value);
	};

	const data: SettingsDataType[] = [
		{
			text: I18n.t("napAlarm"),
			valueToChange: napIsAlarmOn,
			boolSetFunc: setIsAlarmOn,
		},
		{
			text: I18n.t("ringtone"),
			valueToChange: napRingtone,
		},
		{
			text: I18n.t("alarmDuration"),
			valueToChange: napAlarmDuration,
			valueInfoToShow: I18n.t("secs")
		},
		{
			text: I18n.t("screenOn"),
			valueToChange: napSleepModeDisabled,
			boolSetFunc: setNapSleepModeDisabled,
		},
	];

	const sectionItemsAmount = {
		napAlarm: 3,
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

export default NapSettings;
