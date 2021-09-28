import React from "react";
import I18n from "i18n-js";

import ModePlayIcon from "_components/atoms/modes/ModePlayIcon";
import { DBLUE, WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import CreateModeButton from "../create/CreateModeButton";
import { useSharedValue } from "react-native-reanimated";

const width = scaleSize(180);

const ModePlayButton = ({ onPress }: { onPress: () => void }): JSX.Element => {
	const play = I18n.t("modePlayButton");
	const text = useSharedValue(play);

	return (
		<CreateModeButton
			onPress={onPress}
			width={width}
			color={DBLUE}
			textColor={WHITE}
			text={text}
			icon={ModePlayIcon}
		/>
	);
};

export default ModePlayButton;
