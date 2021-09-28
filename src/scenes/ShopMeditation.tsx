import React from "react";
import CreateShopScreen from "_components/molecules/create/CreateShopScreen";

const ShopMeditationScreen = (): JSX.Element => {
	return (
		<CreateShopScreen mode="meditation" />
	);
};

export default React.memo(ShopMeditationScreen);