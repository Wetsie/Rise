import React from "react";
import { PURE_WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import CreateSvgView from "_components/molecules/create/CreateSvgView";

const HomeIllustrationBack = ({ type }: { type: "big" | "small" }): JSX.Element => {
	const width = type === "big" ? scaleSize(298) : scaleSize(128);
	const height = type === "big" ? scaleSize(145) : scaleSize(148);

	return (
		<CreateSvgView
			height={height}
			width={width}
			color={PURE_WHITE}
		/>
	);
};

export default HomeIllustrationBack;