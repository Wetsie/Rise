import { getModeChosenSound } from "./mmkv/MmkvGetFunctions";

export type ChosenSoundObject = {
	[x: string]: string,
}

export type ChosenSoundType = string | string[];
export type ChosenSoundValue = string;

export const getChosenSoundKey = (mode: "focus" | "nap" | "meditation" | ""): number => {
	const chosenSoundKey = Object.keys(getModeChosenSound()).findIndex(value => {
		return JSON.parse(value).includes(mode) || JSON.parse(value) === mode;
	});

	return chosenSoundKey;
};