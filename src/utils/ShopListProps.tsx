import React from "react";
import { DataProvider, Dimension, LayoutProvider } from "recyclerlistview";
import ShopSoundElement from "_components/molecules/shop/ShopSoundElement";
import { CONTENT_PADDING, HOME_TOP_PADDING, MAIN_SMALL_SVG_WIDTH, WHOLE_SOUND_ELEM_HEIGHT } from "_styles/spacing";
import { SoundNames, SoundNamesTemp, SoundPath } from "./SoundsList";

export interface ShopDownloadedArrayType {
	downloadedSoundNames: string[],
	onDownloadEnd: (newArr: string[]) => void,
}

export const LIST_ITEM_HEIGHT = WHOLE_SOUND_ELEM_HEIGHT + HOME_TOP_PADDING * 1.5;

export const getNewArr = (mode: "focus" | "meditation" | "nap" | "main"): string[] => {
	const newSoundNames: string[] = [];

	for (let i = 0; i < SoundNames.length; i++) {
		const element = SoundNamesTemp[SoundNames[i]].type;
		
		if (typeof element == "object") {
			if (element.includes(mode)) {
				newSoundNames.push(SoundNames[i]);
			}
		} else {
			if (element === mode) {
				newSoundNames.push(SoundNames[i]);
			}
		}
	}

	return mode === "main" ? SoundNames : newSoundNames;
};

export const layoutProvider = new LayoutProvider(
	(index) => {
		return index;
	},
	(type, dim) => {
		dim.height = LIST_ITEM_HEIGHT;
		dim.width = MAIN_SMALL_SVG_WIDTH + CONTENT_PADDING;
	}
);

export const getDataProvider = (array: string[]): DataProvider => {
	return new DataProvider((r1, r2) => {
		return r1 !== r2;
	}).cloneWithRows(array);
};

export const rowRenderer = (type: string | number, item: string): JSX.Element => {
	return (
		<ShopSoundElement
			item={item}
			soundPrice={SoundNamesTemp[item].price}
			soundPath={SoundPath[SoundNamesTemp[item].name]}
			soundType={SoundNamesTemp[item].type}
			soundName={SoundNamesTemp[item].name}
		/>
	);
};

export const getLayoutSize = (arrLength: number): Dimension => {
	return ({
		height: LIST_ITEM_HEIGHT * arrLength,
		width: MAIN_SMALL_SVG_WIDTH * 2 + CONTENT_PADDING * 2,
	});
};