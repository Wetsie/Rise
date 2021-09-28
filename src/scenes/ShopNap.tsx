import React from "react";
import CreateShopScreen from "_components/molecules/create/CreateShopScreen";

const ShopNapScreen = (): JSX.Element => {
	return (
		<CreateShopScreen mode="nap" />
	);
};

export default React.memo(ShopNapScreen);