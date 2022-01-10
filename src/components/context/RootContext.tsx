import React from "react";
import { Audio } from "expo-av";
import { ModesRelatedType } from "_utils/RootComponentUtils";
import I18n from "i18n-js";

const RootContext = React.createContext<ModesRelatedType>({
	alarmSound: new Audio.Sound(),

	onCountdownFinish: () => null,
	onPomodoroFinish: () => null,
	onInfiniteFinish: () => null,
	onMeditationFinish: () => null,
	pomodoroCurrentBreakTime: { value: 0 },
	meditationMode: { value: I18n.t("inhale") },
	
	userInfo: {
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		balance: 0,
		purchases: [],
		proVersion: false,
		stat: {
			focus: 0,
			meditation: 0,
			nap: 0,
		}
	},
	setUserInfo: () => { null; },
	isSignedIn: false,
	setIsSignedIn: () => { null; },

	systemAlarmsObject: {},

	swipeTextSize: 0,
	
	isTimerOn: false,
	setIsTimerOn: () => { null; },
	isTimerPaused: { value: true },
	timerMinutes: { value: 0 },

	meditationBreathSounds: { value: true },
	meditationVibration: { value: true },
	meditationSleepModeDisabled: { value: true },
	meditationBreathPerMin: { value: 4 },

	napIsAlarmOn: { value: true },
	napAlarmDuration: { value: 5 },
	napRingtone: { value: "Default" },
	napSleepModeDisabled: { value: true },

	pomodoroBreakMinutes: { value: 0 },
	pomodoroLongBreakMinutes: { value: 0 },
	pomodoroLongBreakEvery: { value: 0 },
	focusFullImmersion: { value: true },
	focusSleepModeDisabled: { value: true },

	timerCountdownProgress: { value: 0 },
	timerPomodoroProgress: { value: 0 },
	timerInfiniteProgress: { value: 0 },
	meditationProgress: { value: 0 },

	pomodoroMinutes: { value: 5 * 60 },
	modeNavigation: { value: "" },
	sound: new Audio.Sound(),
	breathSound: new Audio.Sound(),
	activeModeIndex: 0,
	setActiveModeIndex: () => { null; },
	infiniteTime: { value: 0 },
	volume: { value: 1 },
});

export default RootContext;
