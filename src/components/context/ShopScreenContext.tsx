import { createContext } from "react";

interface ContextType {
    height: number,
    downloadHeight: number,
	downloadedSoundNames: { value: string; type: string | string[]; }[],
	onDownloadEnd: (
		newArr: {
			value: string;
			type: string | string[];
		}[]
	) => void,
}

const ShopListContext = createContext<ContextType>({
	height: 0,
	downloadHeight: 0,
	downloadedSoundNames: [],
	onDownloadEnd: (arr) => { arr; },
});

export default ShopListContext;
