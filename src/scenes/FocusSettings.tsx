import React, { useRef, useContext } from "react";
import { Modalize } from "react-native-modalize";
import { useSharedValue } from "react-native-reanimated";
import I18n from "i18n-js";

import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import RootContext from "_components/context/RootContext";
import CreateModeSettings from "_components/molecules/create/CreateModeSettings";
import { setBreakMinutes, setFocusFullImmersion, setFocusSleepModeDisabled, setLongBreakEvery, setLongBreakMinutes } from "_utils/mmkv/MmkvSetFunctions";
import { useStateSafe } from "_utils/useStateSafe";

const breakMinutesArrLength = 12;
const longBreakMinutesArrLength = 16;
const longBreakEveryArrLength = 12;
const breakMinutesArr: number[] = [...Array(breakMinutesArrLength)].map((_, i) => 5 * (i + 1));
const longBreakMinutesArr: number[] = [...Array(longBreakMinutesArrLength)].map((_, i) => 10 + (5 * (i + 1)));
const longBreakEveryArr: number[] = [...Array(longBreakEveryArrLength)].map((_, i) => i + 1);

const FocusSettings = (): JSX.Element => {
	const time = I18n.currentLocale() !== "ru" ?
		I18n.t("times") : 
		"-й " + I18n.t("time");

	const {
		pomodoroBreakMinutes,
		pomodoroLongBreakEvery,
		pomodoroLongBreakMinutes,
		focusFullImmersion,
		focusSleepModeDisabled,
	} = useContext(RootContext);
	const optionKey = useSharedValue(0);
	const modalHeader = useSharedValue("");
	const modalRef = useRef<Modalize>(null);
	const [arrayToMap, setArrayToMap] = useStateSafe<number[]>([]);

	const onOverlayPress = () => {
		modalRef.current?.close();
		!optionKey.value ?
			setBreakMinutes(pomodoroBreakMinutes.value) :
			optionKey.value === 1 ?
				setLongBreakMinutes(pomodoroLongBreakMinutes.value) :
				setLongBreakEvery(pomodoroLongBreakEvery.value);
	};

	const onOptionPress = (text: string, key: number) => {
		modalHeader.value = text;
		optionKey.value = key;
		!key ?
			setArrayToMap(breakMinutesArr) :
			key === 1 ?
				setArrayToMap(longBreakMinutesArr) :
				setArrayToMap(longBreakEveryArr);
		modalRef.current?.open();
	};

	const fullImmersionPressFunc = (value: boolean) => {
		setFocusFullImmersion(value);
	};

	const data = [
		{
			text: I18n.t("breakTime"),
			valueToChange: pomodoroBreakMinutes,
			valueInfoToShow: I18n.t("min"),
		},
		{
			text: I18n.t("longBreakTime"),
			valueToChange: pomodoroLongBreakMinutes,
			valueInfoToShow: I18n.t("min"),
		},
		{
			text: I18n.t("longBreakEvery"),
			valueToChange: pomodoroLongBreakEvery,
			valueInfoToShow: time,
		},
		{
			text: I18n.t("fullImmersion"),
			valueToChange: focusFullImmersion,
			boolSetFunc: fullImmersionPressFunc,
		},
		{
			text: I18n.t("screenOn"),
			valueToChange: focusSleepModeDisabled,
			boolSetFunc: setFocusSleepModeDisabled,
		},
	];

	const sectionItemsAmount = {
		pomodoro: 3,
		advanced: 2,
	};

	return (
		<CreateModeSettingsContext.Provider
			value={{
				onOverlayPress,
				onOptionPress,
				modalRef,
				modalHeader,
				sectionItemsAmount,
				optionKey,
				arrayToMap,
				data,
			}}
		>
			<CreateModeSettings />
		</CreateModeSettingsContext.Provider>
	);
};

export default FocusSettings;
