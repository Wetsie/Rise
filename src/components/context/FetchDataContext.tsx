import { createContext } from "react";

const FetchDataContext = createContext<{
	setSystemAlarmsObject: React.Dispatch<React.SetStateAction<Record<string, string>>>,
	setSwipeTextSize: React.Dispatch<React.SetStateAction<number>>,
}>({
	setSystemAlarmsObject: () => { null; },
	setSwipeTextSize: () => { null; },
});

export default FetchDataContext;