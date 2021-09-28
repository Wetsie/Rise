import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Pressable, Platform, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker, { AndroidEvent } from "@react-native-community/datetimepicker";
import * as ImageManipulator from "expo-image-manipulator";
import I18n from "i18n-js";

import CustomText from "_components/atoms/CustomText";
import { BLACK, DBLUE, GRAY, LBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_16, FONT_SIZE_30 } from "_styles/typography";
import { HOME_TOP_PADDING } from "_styles/spacing";
import { useStateSafe } from "_utils/useStateSafe";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import RootContext from "_components/context/RootContext";
import { setMmkvIsSignedIn, setMmkvProfileImage, setMmkvUploadProfileImageToServer, setMmkvUserInfo } from "_utils/mmkv/MmkvSetFunctions";
import { pickProfileImage } from "_utils/ImagePicker";
import { user, userDatabaseReference } from "_utils/Firebase";

const elemHeight = scaleSize(56);
const { width } = Dimensions.get("window");

const Welcome = (): JSX.Element => {
	const {
		setIsSignedIn,
		setUserInfo,
		profileImageUri,
		setProfileImageUri,
		setProfileImage,
		setUploadProfileImageToServer
	} = useContext(RootContext);
	const [name, setName] = useStateSafe("");
	const [surname, setSurname] = useStateSafe("");
	const [datePickerShow, setDatePickerShow] = useStateSafe(false);
	const [wasDateChanged, setWasDateChanged] = useStateSafe(false);
	const [birthdate, setBirthdate] = useStateSafe<Date | null>(null);

	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				return true;
			};
    
			BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
			return () =>
				BackHandler.removeEventListener("hardwareBackPress", onBackPress);
		}, [])
	);

	const onChange = (event: AndroidEvent, selectedDate?: Date) => {
		setDatePickerShow(Platform.OS === "ios");
		if (selectedDate) {
			setBirthdate(selectedDate);
			setWasDateChanged(true);
		}
	};

	const onPress = async () => {
		const capitName = name[0].toUpperCase() + name.substring(1);
		const capitSurname = surname[0].toUpperCase() + surname.substring(1);
		
		setUserInfo({
			firstName: capitName,
			lastName: capitSurname,
			dateOfBirth: (birthdate as Date).toLocaleDateString(),
			balance: 0,
			purchases: ["undefined"],
			proVersion: false,
			stat: {
				focus: 0,
				meditation: 0,
				nap: 0,
			}
		});
		setMmkvUserInfo({
			firstName: capitName,
			lastName: capitSurname,
			dateOfBirth: (birthdate as Date).toLocaleDateString(),
			balance: 0,
			purchases: ["undefined"],
			proVersion: false,
			stat: {
				focus: 0,
				meditation: 0,
				nap: 0,
			}
		});
		if (!user?.isAnonymous) {
			userDatabaseReference.update({
				firstName: capitName,
				lastName: capitSurname,
				dateOfBirth: (birthdate as Date).toLocaleDateString(),
				balance: 0,
				purchases: ["undefined"],
				proVersion: false,
				stat: {
					focus: 0,
					meditation: 0,
					nap: 0,
				}
			});

			setUploadProfileImageToServer(true);
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
		setMmkvIsSignedIn(true);
		setIsSignedIn(true);
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<Pressable onPress={() => pickProfileImage(setProfileImageUri)}>
				<FastImage
					source={
						profileImageUri === "" ?
							require("_assets/images/ProfilePlaceholder.jpg") : {
								uri: profileImageUri
							}
					}
					style={styles.profileImage}
				/>
			</Pressable>
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
				style={styles.buttonContainer}
				disabled={name === "" || surname === "" || profileImageUri === "" || !birthdate}
				onPress={onPress}
			>
				<View style={styles.authButton}>
					<CreateSvgView
						width={scaleSize(302)}
						height={scaleSize(56)}
						color={DBLUE}
					/>
					<CustomText style={styles.authButtonText}>{I18n.t("completeRegistration")}</CustomText>
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

export default Welcome;
