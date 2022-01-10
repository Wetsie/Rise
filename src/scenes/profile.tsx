import React, { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "i18n-js";

import { LBLUE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import ProfileUserInfoView from "_components/molecules/profile/ProfileUserInfoView";
import ProfileCurrentBalanceView from "_components/molecules/profile/ProfileCurrentBalanceView";
import CreateStatView from "_components/molecules/create/CreateStatView";
import RootContext from "_components/context/RootContext";
import ProfileFocusIcon from "_components/atoms/profile/ProfileFocusIcon";
import ProfileMeditationIcon from "_components/atoms/profile/ProfileMeditationIcon";
import ProfileNapIcon from "_components/atoms/profile/ProfileNapIcon";
import { HOME_TOP_PADDING } from "_styles/spacing";

const { width, height } = Dimensions.get("window");
const COVERED_IMAGE_SIZE = scaleSize(270);
const UNCOVERED_IMAGE_SIZE = height / 2;
const IMAGE_COVER_HEIGHT = UNCOVERED_IMAGE_SIZE - COVERED_IMAGE_SIZE;

const PersonalRoomScreen = (): JSX.Element => {
	const { focus, meditation, nap } = useContext(RootContext).userInfo.stat;

	return (
		<SafeAreaView style={styles.mainContainer}>
			<ProfileUserInfoView />
			<ProfileCurrentBalanceView />
			<CreateStatView
				icon={ProfileFocusIcon}
				stat={focus}
				text={I18n.t("focus")}
			/>
			<CreateStatView
				icon={ProfileMeditationIcon}
				stat={meditation}
				text={I18n.t("meditation")}
			/>
			<CreateStatView
				icon={ProfileNapIcon}
				stat={nap}
				text={I18n.t("nap")}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingTop: HOME_TOP_PADDING,
		backgroundColor: LBLUE,
		alignItems: "center",
		flex: 1,
	},

	imageCoverStyle: {
		marginTop: COVERED_IMAGE_SIZE,
		height: IMAGE_COVER_HEIGHT,
		position: "absolute",
		backgroundColor: LBLUE,
		width,
	},

	image: {
		width,
		height: height / 2,
	},
});

export default PersonalRoomScreen;
