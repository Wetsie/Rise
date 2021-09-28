import { createContext } from "react";
import { IHandles } from "react-native-modalize/lib/options";
import Animated from "react-native-reanimated";
import { SettingsDataType } from "_utils/ModeSettingsProps";

interface CreateModeSettings {
    onOverlayPress: () => void,
    onOptionPress: (text: string, key: number) => void,
    modalRef: React.RefObject<IHandles> | null,
    modalHeader: Animated.SharedValue<string>,
    optionKey: Animated.SharedValue<number>,
    data: SettingsDataType[],
    sectionItemsAmount: {
        [x: string]: number
    },
    arrayToMap: number[] | string[]
}

const CreateModeSettingsContext = createContext<CreateModeSettings>({
	onOverlayPress: () => null,
	onOptionPress: (text) => text,
	modalRef: null,
	modalHeader: { value: "" },
	optionKey: { value: 0 },
	data: [],
	arrayToMap: [],
	sectionItemsAmount: {},
});

export default CreateModeSettingsContext;