import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedGestureHandler, withDecay, useAnimatedStyle } from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "i18n-js";

import { LBLUE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { HOME_TOP_PADDING, PROFILE_ELEMENTS_HEIGHT, STATUS_HEIGHT } from "_styles/spacing";
import ProfileUserInfoView from "_components/molecules/profile/ProfileUserInfoView";
import ProfileCurrentBalanceView from "_components/molecules/profile/ProfileCurrentBalanceView";
import CreateStatView from "_components/molecules/create/CreateStatView";
import RootContext from "_components/context/RootContext";
import ProfileFocusIcon from "_components/atoms/profile/ProfileFocusIcon";
import ProfileMeditationIcon from "_components/atoms/profile/ProfileMeditationIcon";
import ProfileNapIcon from "_components/atoms/profile/ProfileNapIcon";

const { width, height } = Dimensions.get("window");
const COVERED_IMAGE_SIZE = scaleSize(270);
const UNCOVERED_IMAGE_SIZE = height / 2;
const IMAGE_COVER_HEIGHT = UNCOVERED_IMAGE_SIZE - COVERED_IMAGE_SIZE;
const CLAMP_HEIGHT = PROFILE_ELEMENTS_HEIGHT / 2 + HOME_TOP_PADDING;
const ASafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const PersonalRoomScreen = (): JSX.Element => {
	const { profileImage } = useContext(RootContext);
	const { focus, meditation, nap } = useContext(RootContext).userInfo.stat;

	const translateY = useSharedValue(0);
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (event, ctx: { offsetY: number }) => {
			ctx.offsetY = translateY.value;
		},

		onActive: (event, ctx: { offsetY: number }) => {
			translateY.value = clamp(ctx.offsetY + event.translationY, -CLAMP_HEIGHT, 0);
		},

		onEnd: (event) => {
			translateY.value = 
			withDecay({
				deceleration: 0.995,
				velocity: event.velocityY,
				clamp: [-CLAMP_HEIGHT, 0]
			});
		}
	});

	const swipeStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value },
			],
		};
	});

	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<ASafeAreaView style={[styles.mainContainer, swipeStyle]}>
				<Image
					source={{
						uri: profileImage?.uri ?? "",
					}}
					style={styles.image}
				/>
				<View style={styles.imageCoverStyle} />
				<View style={styles.containers}>
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
				</View>
			</ASafeAreaView>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingTop: -STATUS_HEIGHT,
		backgroundColor: LBLUE,
		alignItems: "center",
		flex: 1,
	},

	containers: {
		marginTop: UNCOVERED_IMAGE_SIZE - IMAGE_COVER_HEIGHT * 1.5,
		position: "absolute",
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
