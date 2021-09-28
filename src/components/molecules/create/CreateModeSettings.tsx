import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import I18n from "i18n-js";

import CreateGoBackView from "_components/molecules/create/CreateGoBackView";
import ModeSettingsSection from "_components/molecules/modes/ModeSettingsSection";
import { GRAY, WHITE } from "_styles/colors";
import { CONTENT_PADDING, STATUS_HEIGHT } from "_styles/spacing";
import { FONT_SIZE_16 } from "_styles/typography";
import ModeOptionChooseContent from "_components/molecules/modes/modeOptionsChoose/ModeOptionChooseContent";
import CreateModeSettingsContext from "_components/context/CreateModeSettingsContext";
import ModeSliderSection from "../modes/ModeSliderSection";
import RingtoneChoose from "../modes/modeOptionsChoose/RingtoneChoose";

const CreateModeSettings = (): JSX.Element => {
	const { data, modalRef, onOverlayPress, sectionItemsAmount, arrayToMap } = useContext(CreateModeSettingsContext);
	const itemsKeys = Object.keys(sectionItemsAmount);
	const itemsValues = Object.values(sectionItemsAmount);	

	return (
		<SafeAreaView style={styles.mainContainer}>
			<CreateGoBackView goBackText={I18n.t("settings")} />
			{
				itemsValues.map((item, key) => {
					const previousKey = key - 1;

					return (
						<View key={key}>
							<ModeSettingsSection
								sectionHeader={I18n.t(itemsKeys[key])}
								text={
									data?.slice(
										// if the element is at the very beginning, then we cut off the array from zero,
										// otherwise, we cut off from the previous element
										previousKey < 0 ? 0 : sectionItemsAmount[itemsKeys[previousKey]],
										// if the element is at the very beginning, then we cut off the array
										// to the value given in the array,
										// otherwise, we cut off to the beginning of the next element
										previousKey < 0 ?
											sectionItemsAmount[itemsKeys[key]] :
											sectionItemsAmount[itemsKeys[previousKey]] +
											sectionItemsAmount[itemsKeys[key]]
									)
								}
							/>
							{!key ? <ModeSliderSection /> : null /* ставим слайдер звука после 1-го элемента */}
						</View>
					);
				})
			}
			<Modalize
				ref={modalRef}
				withHandle={false}
				adjustToContentHeight={true}
				onOverlayPress={onOverlayPress}
				overlayStyle={styles.overlayStyle}
				modalStyle={styles.modalStyle}
				panGestureEnabled={false}
				scrollViewProps={{
					showsVerticalScrollIndicator: false,
					overScrollMode: "never",
				}}
			>
				{
					typeof arrayToMap[0] == "string" ? 
						<RingtoneChoose/> :
						<ModeOptionChooseContent />
				}
			</Modalize>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: WHITE,
		paddingTop: -STATUS_HEIGHT,
	},

	categoryTextStyle: {
		marginLeft: CONTENT_PADDING * 2,
		marginTop: CONTENT_PADDING * 2,
		marginBottom: CONTENT_PADDING / 2,
		fontSize: FONT_SIZE_16,
		color: GRAY,
	},

	contentContainerStyle: {
		paddingBottom: CONTENT_PADDING * 2,
	},

	overlayStyle: {
		backgroundColor: "transparent"
	},

	modalStyle: {
		elevation: 10
	}
});

export default CreateModeSettings;
