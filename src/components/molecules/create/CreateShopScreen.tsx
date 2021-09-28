import React from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecyclerListView } from "recyclerlistview";
import { useFocusEffect } from "@react-navigation/core";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import I18n from "i18n-js";

import { LBLUE } from "_styles/colors";
import { LIST_ITEM_HEIGHT, rowRenderer, layoutProvider, getDataProvider, getLayoutSize, getNewArr } from "_utils/ShopListProps";
import { HOME_TOP_PADDING } from "_styles/spacing";
import { useCallback } from "react";

const CreateShopScreen = ({ mode }: {
	mode: "focus" | "meditation" | "nap" | "main",
}): JSX.Element => {
	const scrollViewProps: ScrollViewProps = {
		removeClippedSubviews: true,
		contentContainerStyle: styles.contentContainerStyle,
		showsVerticalScrollIndicator: false,
		overScrollMode: "never",
	};

	const array = getNewArr(mode);

	useFocusEffect(
		useCallback(() => {
			const unsubscribe = NetInfo.addEventListener(state => {
				if (!state.isConnected) {
					Toast.show({
						type: "error",
						text1: I18n.t("noInternetConnectionErr"),
						position: "bottom",
						visibilityTime: 2000,
					});
				}
			});
		
			return () => unsubscribe();
		}, [])
	);

	return (
		<SafeAreaView style={styles.mainContainer}>
			<RecyclerListView
				layoutSize={getLayoutSize(array.length)}
				dataProvider={getDataProvider(array)}
				scrollViewProps={scrollViewProps}
				layoutProvider={layoutProvider}
				renderAheadOffset={40 * array.length}
				rowRenderer={rowRenderer}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: LBLUE,
		paddingTop: -HOME_TOP_PADDING * 2
	},

	contentContainerStyle: {
		marginTop: HOME_TOP_PADDING * 2,
		paddingBottom: LIST_ITEM_HEIGHT / 2,
	},
});

export default CreateShopScreen;