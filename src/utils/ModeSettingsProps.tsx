import Animated from "react-native-reanimated";

export interface SettingsDataType {
    text: string;
    valueToChange: Animated.SharedValue<number | boolean | string>;
    valueInfoToShow?: string;
    boolSetFunc?: (value: boolean) => void;
}