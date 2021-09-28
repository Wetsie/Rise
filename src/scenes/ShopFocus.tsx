import React from "react";
import CreateShopScreen from "_components/molecules/create/CreateShopScreen";

const ShopFocusScreen = (): JSX.Element => {
	return (
		<CreateShopScreen mode="focus" />
	);
};

export default React.memo(ShopFocusScreen);