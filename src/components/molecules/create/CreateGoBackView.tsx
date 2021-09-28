import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import GoBackArrow from "_components/atoms/profile/GoBackArrow";
import { BLACK, GRAY, WHITE } from "_styles/colors";
import { CONTENT_PADDING, GO_BACK_VIEW_HEIGHT, STATUS_HEIGHT } from "_styles/spacing";
import { FONT_SIZE_20 } from "_styles/typography";
import CreateSvgView from "./CreateSvgView";
import CustomText from "../../atoms/CustomText";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "@react-navigation/native";
import { GoBackProps } from "_utils/PropTypes";

const CreateGoBackView = ({ style, GoBackLeftElem, goBackText }: GoBackProps): JSX.Element => {
	const navigation = useNavigation();

	return (
		<Shadow contentViewStyle={style} startColor={GRAY + "18"} distance={20} offset={[0, -5]}>
			<CreateSvgView
				height={GO_BACK_VIEW_HEIGHT + STATUS_HEIGHT}
				width={Dimensions.get("window").width}
				color={WHITE}
				radius={0}
			/>
			<View style={styles.contentStyle}>
				<Pressable hitSlop={30} onPress={() => navigation.goBack()}>
					<GoBackArrow color={BLACK} />
				</Pressable>
				<CustomText style={styles.optionsText}>{goBackText}</CustomText>
				{
					GoBackLeftElem ?
						<GoBackLeftElem
							color={BLACK}
							onPress={() => navigation.navigate("ModeSettings")}
						/> :
						<GoBackArrow color={BLACK} opacity={0} />}
			</View>
		</Shadow>
	);
};

const styles = StyleSheet.create({
	contentStyle: {
		width: "100%",
		height: "100%",
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: CONTENT_PADDING * 2,
		paddingTop: STATUS_HEIGHT,
	},

	optionsText: {
		fontSize: FONT_SIZE_20,
	},
});

export default React.memo(CreateGoBackView);
