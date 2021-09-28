import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { runOnJS } from "react-native-reanimated";

import RootContext from "_components/context/RootContext";
import ModePlayButton from "./ModePlayButton";
import ModePauseButton from "./ModePauseButton";
import ModeStopButton from "./ModeStopButton";
import { getDownloadedSoundNames, getModeChosenSound } from "_utils/mmkv/MmkvGetFunctions";
import { loadSoundFromPhone } from "_utils/ModeSoundsListProps";
import CreateModeScreenContext from "_components/context/CreateModeScreenContext";
import { DARK_MODE_MAIN, DBLUE, WHITE } from "_styles/colors";
import { useStateSafe } from "_utils/useStateSafe";
import { getSoundVolumeWhenBreathIsOn } from "_utils/RootComponentUtils";
import { getChosenSoundKey } from "_utils/ModeChosenSound";

const ModeTimerButton = (): JSX.Element => {
	const {
		isTimerOn,
		setIsTimerOn,
		pomodoroMinutes,
		isTimerPaused,
		timerMinutes,
		infiniteTime,
		sound,
		volume,
		meditationBreathSounds
	} = useContext(RootContext);
	const { mode } = useContext(CreateModeScreenContext);
	const [downloadedSoundNames] = useStateSafe(getDownloadedSoundNames());

	const endButtonColor = mode === "nap" ? DARK_MODE_MAIN : WHITE;
	const endButtonTextColor = mode === "nap" ? WHITE : DBLUE;

	const playHandler = () => {
		const chosenSoundObj = getModeChosenSound();
		const chosenSoundKey = getChosenSoundKey(mode);
		const soundName = Object.values(chosenSoundObj)[chosenSoundKey];
		
		pomodoroMinutes.value = timerMinutes.value;
		setIsTimerOn(true);
		isTimerPaused.value = false;

		const volumeToSet =
			mode !== "meditation" || meditationBreathSounds.value ?
				volume.value :
				getSoundVolumeWhenBreathIsOn(volume);

		loadSoundFromPhone({
			downloadedSoundNames,
			soundName,
			volume: volumeToSet,
			sound,
		});
	};
	
	const pauseHandler = async () => {
		isTimerPaused.value = true;
		await sound.pauseAsync();
	};
	
	const resumeHandler = async () => {
		isTimerPaused.value = false;

		await sound.playAsync();
	};
	
	const stopHandler = async () => {
		setIsTimerOn(false);
		isTimerPaused.value = true;

		timerMinutes.value = mode === "meditation" ? 1 * 60 : 5 * 60;
		infiniteTime.value = 0;
		await sound.unloadAsync();
	};

	const onPress = () => {
		"worklet";
		isTimerPaused.value ?
			runOnJS(resumeHandler)() :
			runOnJS(pauseHandler)();
	};

	return !isTimerOn ?
		<ModePlayButton onPress={playHandler} /> :
		<View style={styles.stopPauseContainer}>
			{
				mode === "focus" ?
					<ModePauseButton onPress={onPress} /> :
					null
			}
			<ModeStopButton
				onPress={stopHandler}
				colors={{
					endButtonColor,
					endButtonTextColor
				}}
			/>
		</View>;
};

const styles = StyleSheet.create({
	stopPauseContainer: {
		flexDirection: "row",
	}
});

export default ModeTimerButton;
