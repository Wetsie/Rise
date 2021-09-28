import * as React from "react";
import { WHITE } from "_styles/colors";
import { MAIN_SMALL_SVG_HEIGHT, MAIN_SMALL_SVG_WIDTH, WIDTH_MINUS_PADDING } from "_styles/spacing";
import CreateSvgView from "_components/molecules/create/CreateSvgView";

const MainSvgView = ({ type }: { type: "big" | "small" }): JSX.Element =>
	<CreateSvgView
		height={MAIN_SMALL_SVG_HEIGHT}
		width={type === "small" ? MAIN_SMALL_SVG_WIDTH : WIDTH_MINUS_PADDING}
		color={WHITE}
	/>;

export default MainSvgView;
