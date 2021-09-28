import { createContext } from "react";
import { ChosenSoundValue } from "_utils/ModeChosenSound";

interface ContextType {
    onPress: (index: number, soundName: string, soundType: string | string[]) => Promise<void> | null,
    isActive: boolean,
    chosenSound: ChosenSoundValue,
    newSoundNames: string[],
}

const ModeSoundsContext = createContext<ContextType>({
	onPress: () => null,
	isActive: false,
	chosenSound: "",
	newSoundNames: [],
});

export default ModeSoundsContext;