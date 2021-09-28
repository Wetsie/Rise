import * as React from "react";
import { WHITE } from "_styles/colors";
import { WIDTH_MINUS_PADDING, PROFILE_ELEMENTS_HEIGHT } from "_styles/spacing";
import CreateSvgView from "_components/molecules/create/CreateSvgView";

const ProfileElementsView = (): JSX.Element =>
	<CreateSvgView
		height={PROFILE_ELEMENTS_HEIGHT}
		width={WIDTH_MINUS_PADDING}
		color={WHITE}
	/>;

export default ProfileElementsView;