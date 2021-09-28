import React from "react";
import CreateShopScreen from "_components/molecules/create/CreateShopScreen";

const ShopMainScreen = (): JSX.Element => {
	return (
		<CreateShopScreen mode="main" />
	);
};

export default React.memo(ShopMainScreen);