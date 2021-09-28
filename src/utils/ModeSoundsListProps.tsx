/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { Audio } from "expo-av";
import { FileSystem } from "react-native-unimodules";

import ModeSoundElement from "_components/molecules/modes/ModeSoundElement";
import { MAIN_SMALL_SVG_HEIGHT } from "_styles/spacing";
import { SoundNamesTemp, SoundPath } from "./SoundsList";

export const renderItem = ({
	item,
	index,
}: {
	item: string,
	index: number,
}): JSX.Element => {
	return (
		<ModeSoundElement
			index={index}
			soundName={item}
			soundNameLocalized={SoundNamesTemp[item].name}
			soundPath={SoundPath[SoundNamesTemp[item].name]}
			soundType={SoundNamesTemp[item].type}
		/>
	);
};

export const getItemLayout = (data: string[] | null | undefined, index: number): { length: number, offset: number, index: number } => {
	return ({
		length: MAIN_SMALL_SVG_HEIGHT,
		offset: MAIN_SMALL_SVG_HEIGHT * index,
		index,
	});
};

export const loadSoundFromPhone = async ({
	downloadedSoundNames,
	sound,
	volume,
	soundName,
	uri,
}: {
	downloadedSoundNames?: { value: string; type: string | string[]; }[],
	sound: Audio.Sound,
	volume?: number,
	soundName?: string,
	uri?: string,
}): Promise<void> => {
	if (downloadedSoundNames ? downloadedSoundNames.length : 1) {
		const valueToUse = soundName ?
			FileSystem.documentDirectory + soundName + ".mp3" :
			uri ?? "";

		await sound.loadAsync(
			{
				uri: valueToUse,
			},
			{
				isLooping: true,
				shouldPlay: true,
				volume: volume ?? 1,
			}
		);
	}
};