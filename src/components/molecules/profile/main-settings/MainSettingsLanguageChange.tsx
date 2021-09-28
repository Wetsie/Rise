import React from "react";
import { View, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import CreateSvgView from "_components/molecules/create/CreateSvgView";
import { shadowPreset } from "_utils/MainSettingsUtils";
import { CONTENT_PADDING, HOME_TOP_PADDING, WIDTH_MINUS_PADDING } from "_styles/spacing";
import { scaleSize } from "_styles/mixins";
import { WHITE } from "_styles/colors";
import CreateLanguageChangeElement from "_components/molecules/create/CreateLanguageChangeElement";

const MainSettingsLanguageChange = (): JSX.Element => {
	return (
		<View style={styles.languageContainer}>
			<Shadow {...shadowPreset}>
				<CreateSvgView
					width={WIDTH_MINUS_PADDING}
					height={scaleSize(156)}
					color={WHITE}
				/>
			</Shadow>
			<View style={styles.languages}>
				<CreateLanguageChangeElement text="Русский" />
				<CreateLanguageChangeElement text="English" />
				<CreateLanguageChangeElement text="Español" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	languageContainer: {
		marginTop: HOME_TOP_PADDING / 1.5 + HOME_TOP_PADDING,
		marginHorizontal: CONTENT_PADDING,
	},

	languages: {
		width: "100%",
		height: "100%",
		position: "absolute",
		justifyContent: "center",
	},
});

export default MainSettingsLanguageChange;
