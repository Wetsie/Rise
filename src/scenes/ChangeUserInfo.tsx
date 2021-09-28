import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Pressable, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker, { AndroidEvent } from "@react-native-community/datetimepicker";
import * as ImageManipulator from "expo-image-manipulator";
import RNRestart from "react-native-restart";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import { BLACK, DBLUE, GRAY, LBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_16, FONT_SIZE_30 } from "_styles/typography";
import { HOME_TOP_PADDING } from "_styles/spacing";
import { useStateSafe } from "_utils/useStateSafe";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import RootContext from "_components/context/RootContext";
import { setMmkvUserInfo, setMmkvUploadProfileImageToServer, setMmkvProfileImageUri, setMmkvProfileImage } from "_utils/mmkv/MmkvSetFunctions";
import { pickProfileImage } from "_utils/ImagePicker";
import { user, userDatabaseReference } from "_utils/Firebase";

const elemHeight = scaleSize(56);
const { width } = Dimensions.get("window");

const ChangeUserInfo = (): JSX.Element => {
	const { profileImage, userInfo, setProfileImage } = useContext(RootContext);
	const { firstName, lastName, dateOfBirth, stat, balance, purchases, proVersion, } = userInfo;
	const { focus, meditation, nap } = stat;
	const [name, setName] = useStateSafe(firstName);
	const [surname, setSurname] = useStateSafe(lastName);
	const [profileImageUri, setProfileImageUri] = useStateSafe("");
	const [datePickerShow, setDatePickerShow] = useStateSafe(false);
	const [wasDateChanged, setWasDateChanged] = useStateSafe(false);
	const [birthdate, setBirthdate] = useStateSafe<Date | null>(null);
	const [birthdateInitialVal] = useStateSafe(dateOfBirth);

	const onChange = (event: AndroidEvent, selectedDate?: Date) => {
		setDatePickerShow(Platform.OS === "ios");
		if (selectedDate) {
			setBirthdate(selectedDate);
			setWasDateChanged(true);
		}
	};

	const onPress = async () => {
		const capitName = name === "" ? null : name[0].toUpperCase() + name.substring(1);
		const capitSurname = surname === "" ? null : surname[0].toUpperCase() + surname.substring(1);

		const newUserInfo = {
			firstName,
			lastName,
			dateOfBirth,
			balance,
			purchases,
			proVersion,
			stat: {
				focus,
				meditation,
				nap,
			}
		};

		if (capitName) {
			newUserInfo.firstName = capitName;
		}
		if (capitSurname) {
			newUserInfo.lastName = capitSurname;
		}
		if (birthdate) {
			newUserInfo.dateOfBirth = birthdate.toLocaleDateString();
		}

		if (profileImageUri !== "") {
			setMmkvProfileImageUri(profileImageUri);
			if (!user?.isAnonymous) {
				setMmkvUploadProfileImageToServer(true);
			} else {
				const manipResult = await ImageManipulator.manipulateAsync(
					profileImageUri,
					[],
					{ compress: 1, format: ImageManipulator.SaveFormat.JPEG }
				);
				setProfileImage(manipResult);
				setMmkvProfileImage(manipResult);
			}
		}
		setMmkvUserInfo(newUserInfo);
		if (!user?.isAnonymous) {
			userDatabaseReference.update(newUserInfo);
		}
		RNRestart.Restart();
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<Pressable onPress={() => pickProfileImage(setProfileImageUri)}>
				<Image
					source={{
						uri: profileImageUri === "" ? profileImage?.uri ?? "" : profileImageUri,
					}}
					style={styles.profileImage}
				/>
			</Pressable>
			<View style={styles.buttonContainer}>
				<TextInput
					maxLength={10}
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
					maxLength={10}
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
					style={styles.dateText}
				>
					{wasDateChanged ? birthdate?.toLocaleDateString() : birthdateInitialVal}
				</CustomText>
			</Pressable>
			<Pressable
				style={styles.buttonContainer}
				disabled={name === firstName && surname === lastName && !wasDateChanged && profileImageUri === ""}
				onPress={onPress}
			>
				<View style={styles.authButton}>
					<CreateSvgView
						width={scaleSize(302)}
						height={scaleSize(56)}
						color={DBLUE}
					/>
					<CustomText style={styles.authButtonText}>{I18n.t("save")}</CustomText>
				</View>
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
		justifyContent: "center",
		backgroundColor: WHITE,
		flex: 1,
	},

	activityIndicator: {
		position: "absolute"
	},

	authButton: {
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
		color: BLACK,
	},

	dateContainer: {
		justifyContent: "center",
		height: elemHeight,
		borderColor: DBLUE,
		borderRadius: 15,
		borderWidth: 2,
	},

	profileImage: {
		aspectRatio: scaleSize(302) / scaleSize(274),
		height: scaleSize(274),
		borderRadius: 15,
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

export default ChangeUserInfo;
