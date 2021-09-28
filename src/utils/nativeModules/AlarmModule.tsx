import { NativeModules } from "react-native";
const { AlarmModule } = NativeModules;

interface AlarmInterface {
    getAlarms(callback: (data: Record<string, string>) => void): void;
}

export default AlarmModule as AlarmInterface;