import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "_components/atoms/CustomText";
import FetchDataContext from "_components/context/FetchDataContext";
import { DBLUE } from "_styles/colors";
import { FONT_SIZE_50 } from "_styles/typography";
import { setMmkvSwipeTextSize, setMmkvSystemAlarmsObject } from "_utils/mmkv/MmkvSetFunctions";
import AlarmModule from "_utils/nativeModules/AlarmModule";

const FetchData = (): JSX.Element => {
	const {
		setSystemAlarmsObject,
		setSwipeTextSize,
	} = useContext(FetchDataContext);

	useEffect(() => {
		AlarmModule.getAlarms(data => {
			setSystemAlarmsObject(data);
			setMmkvSystemAlarmsObject(data);
		});
	}, []);

	return (
		<View
			onLayout={(event) => {
				setSwipeTextSize(event.nativeEvent.layout.height); // swipe text size
				setMmkvSwipeTextSize(event.nativeEvent.layout.height);
			}}
		>
			<CustomText type="demi" style={styles.textMeasurement50}>180</CustomText>
		</View>
	);
};

const styles = StyleSheet.create({
	textMeasurement50: {
		opacity: 0,
		fontSize: FONT_SIZE_50,
		color: DBLUE
	},
});

export default FetchData;
