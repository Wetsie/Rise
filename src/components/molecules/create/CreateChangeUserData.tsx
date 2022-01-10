import React from "react";
import { Dimensions, StyleSheet, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker, { AndroidEvent } from "@react-native-community/datetimepicker";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import { BLACK, DBLUE, GRAY, LBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_16, FONT_SIZE_30 } from "_styles/typography";
import { HOME_TOP_PADDING } from "_styles/spacing";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import { useStateSafe } from "_utils/useStateSafe";

const elemHeight = scaleSize(56);
const { width } = Dimensions.get("window");

const CreateChangeUserData = ({ onPress }: {
    onPress: (name: string, surname: string, birthdate: Date | null) => void
}): JSX.Element => {
	const [name, setName] = useStateSafe("");
	const [surname, setSurname] = useStateSafe("");
	const [datePickerShow, setDatePickerShow] = useStateSafe(false);
	const [wasDateChanged, setWasDateChanged] = useStateSafe(false);
	const [birthdate, setBirthdate] = useStateSafe<Date | null>(null);

	const onChange = (event: AndroidEvent, selectedDate?: Date) => {
		setDatePickerShow(Platform.OS === "ios");
		if (selectedDate) {
			setBirthdate(selectedDate);
			setWasDateChanged(true);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.buttonContainer}>
				<TextInput
					maxLength={20}
					placeholder={I18n.t("firstName")}
					keyboardType="visible-password"
					placeholderTextColor={GRAY}
					style={styles.textInput}
					onChangeText={text => {
						const formattedText = text.replace(/[^A-Za-zА-Яа-я]/g, ""); 
						setName(formattedText);
					}}
					textContentType="name"
					selectionColor={GRAY}
					textAlign="center"
					value={name}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TextInput
					maxLength={20}
					placeholder={I18n.t("lastName")}
					keyboardType="visible-password"
					textContentType="familyName"
					placeholderTextColor={GRAY}
					onChangeText={text => {
						const formattedText = text.replace(/[^A-Za-zА-Яа-я]/g, ""); 
						setSurname(formattedText);
					}}
					style={styles.textInput}
					selectionColor={GRAY}
					textAlign="center"
					value={surname}
				/>
			</View>
			<Pressable
				onPress={() => setDatePickerShow(true)}
				style={[styles.buttonContainer, styles.dateContainer]}
			>
				<CustomText
					style={[styles.dateText, {
						color: wasDateChanged ? BLACK : GRAY,
					}]}
				>
					{wasDateChanged ? birthdate?.toLocaleDateString() : I18n.t("dateOfBirth")}
				</CustomText>
			</Pressable>
			<Pressable
				style={[styles.buttonContainer, styles.authButton]}
				disabled={name === "" || surname === "" || !birthdate}
				onPress={() => onPress(name, surname, birthdate)}
			>
				<CreateSvgView
					width={scaleSize(302)}
					height={scaleSize(56)}
					color={DBLUE}
				/>
				<CustomText style={styles.authButtonText}>{I18n.t("completeRegistration")}</CustomText>
			</Pressable>
			{
				datePickerShow && 
				<DateTimePicker
					mode="date"
					value={birthdate ?? new Date()}
					onChange={onChange}
					maximumDate={new Date()}
				/>
			}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		paddingHorizontal: (width - scaleSize(302)) / 2,
		justifyContent: "flex-end",
		backgroundColor: WHITE,
		flex: 1,
	},

	activityIndicator: {
		position: "absolute"
	},

	authButton: {
		marginBottom: HOME_TOP_PADDING * 2,
		alignItems: "center",
		justifyContent: "center",
	},

	authButtonText: {
		position: "absolute",
		color: WHITE,
		fontSize: 20,
	},

	dateText: {
		fontSize: FONT_SIZE_16,
		textAlign: "center",
	},

	dateContainer: {
		justifyContent: "center",
		height: elemHeight,
		borderColor: DBLUE,
		borderRadius: 15,
		borderWidth: 2,
	},

	register: {
		fontSize: FONT_SIZE_30,
		textAlign: "center",
		color: BLACK,
	},
	
	buttonContainer: {
		marginTop: HOME_TOP_PADDING,
	},
	
	line: {
		backgroundColor: LBLUE,
		height: scaleSize(2),
		flex: 1,
	},
	
	socialMediaTextContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	
	socialMediaText: {
		fontSize: FONT_SIZE_16,
		color: DBLUE,
	},

	textInput: {
		color: BLACK,
		height: elemHeight,
		fontFamily: "FuturaPT-Book",
		fontSize: FONT_SIZE_16,
		borderColor: DBLUE,
		borderRadius: 15,
		borderWidth: 2,
	},
});

export default CreateChangeUserData;
