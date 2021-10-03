import React, { useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import ExtraDimensions from "react-native-extra-dimensions-android";
import { Audio } from "expo-av";
import I18n from "i18n-js";

import ModeSoundsContext from "_components/context/ModeSoundsContext";
import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import { screenMainContainerStyle } from "_styles/spacing";
import { HOME_TOP_PADDING, MAIN_SMALL_SVG_HEIGHT } from "_styles/spacing";
import { getDownloadedSoundNames, getModeChosenSound } from "_utils/mmkv/MmkvGetFunctions";
import { setModeChosenSound } from "_utils/mmkv/MmkvSetFunctions";
import { getItemLayout, loadSoundFromPhone, renderItem } from "_utils/ModeSoundsListProps";
import { useStateSafe } from "_utils/useStateSafe";
import RootContext from "_components/context/RootContext";
import NoSoundsButton from "_components/atoms/modes/NoSoundsButton";
import { BLACK } from "_styles/colors";
import { ChosenSoundValue, getChosenSoundKey } from "_utils/ModeChosenSound";

const ModeSounds = (): JSX.Element => {
	const navigation = useNavigation();
	const { modeNavigation } = useContext(RootContext);
	const [downloadedSoundNames] = useStateSafe(getDownloadedSoundNames());
	const [chosenSoundObj] = useStateSafe(getModeChosenSound());
	const [chosenSoundKey] = useStateSafe(getChosenSoundKey(modeNavigation.value));
	const [chosenSound, setChosenSound] = useStateSafe(
		Object.values(chosenSoundObj)[chosenSoundKey]
	);
	const [sound] = useStateSafe<Audio.Sound>(new Audio.Sound());
	const [isSoundPlaying, setIsSoundPlaying] = useStateSafe(false);
	const [isActive, setIsActive] = useStateSafe(false);
	const [modalVisible, setModalVisible] = useStateSafe(false);

	const newSoundNames: string[] = [];

	downloadedSoundNames.map(value => {
		if (typeof value.type === "object") {
			if (value.type.includes(modeNavigation.value)) {
				newSoundNames.push(value.value);
			}
		}

		if (value.type === modeNavigation.value) {
			newSoundNames.push(value.value);
		}
	});

	const onPress = async (index: number, soundName: ChosenSoundValue) => {
		if (
			newSoundNames.findIndex(value => {
				return value === chosenSound;
			}) === index
		) {
			if (isActive) {
				await sound.pauseAsync();
			} else {
				if (isSoundPlaying) {
					await sound.playAsync();
				} else {
					loadSoundFromPhone({
						downloadedSoundNames,
						soundName,
						sound
					});
					setIsSoundPlaying(true);
				}
			}

			setIsActive(!isActive);
		} else {
			setIsActive(false);
			setIsSoundPlaying(false);
			setChosenSound(soundName);
			setModeChosenSound(getModeChosenSound(), modeNavigation.value, soundName);
			await sound?.unloadAsync();
		}
	};

	useEffect(() => {
		if (!newSoundNames.length) {
			setModalVisible(true);
		}
	}, []);

	useEffect(() => {
		return () => {
			sound?.unloadAsync();
		};
	}, [sound]);

	const closeModal = () => {
		setModalVisible(false);
		navigation.goBack();
	};

	return (
		<ModeSoundsContext.Provider
			value={{
				chosenSound,
				isActive,
				onPress,
				newSoundNames,
			}}
		>
			<SafeAreaView style={screenMainContainerStyle}>
				<CreateGoBackView goBackText={I18n.t("modeSoundsChoose")} />
				<FlatList
					data={newSoundNames.sort()}
					renderItem={renderItem}
					getItemLayout={getItemLayout}
					contentContainerStyle={styles.contentContainerStyle}
					columnWrapperStyle={styles.columnWrapperStyle}
					showsVerticalScrollIndicator={false}
					overScrollMode="never"
					keyExtractor={(item, index) => index.toString()}
					numColumns={2}
				/>
				<Modal
					deviceHeight={ExtraDimensions.getRealWindowHeight()}
					isVisible={modalVisible}
					backdropColor={BLACK}
					onBackButtonPress={closeModal}
					onBackdropPress={closeModal}
					statusBarTranslucent={true}
					useNativeDriverForBackdrop
					useNativeDriver
				>
					<NoSoundsButton />
				</Modal>
			</SafeAreaView>
		</ModeSoundsContext.Provider>
	);
};

const styles = StyleSheet.create({
	contentContainerStyle: {
		marginTop: HOME_TOP_PADDING,
		paddingBottom: MAIN_SMALL_SVG_HEIGHT / 2,
	},

	columnWrapperStyle: {
		marginTop: HOME_TOP_PADDING,
		marginBottom: HOME_TOP_PADDING / 2,
	},
});

export default ModeSounds;
