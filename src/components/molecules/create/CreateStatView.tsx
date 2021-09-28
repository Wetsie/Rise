import React from "react";
import { StyleSheet } from "react-native";
import I18n from "i18n-js";

import CreateProfileElement from "_components/molecules/create/CreateProfileElement";
import CreateProfileStatsText from "_components/molecules/create/CreateProfileStatsText";

const CreateStatView = ({ stat, text, icon }: {
    stat: number,
    text: string,
    icon: () => JSX.Element
}): JSX.Element => {
	const Icon = icon;
	const elementType: "hours-only" | "minutes-only" | "minutes-hours" =
		stat < 60 ?
			"minutes-only" :
			stat % 60 === 0 ?
				"hours-only" :
				"minutes-hours";

	const hours = Math.floor(stat / 60);
	const mins = stat - hours * 60;

	const firstElemTextToShow = 
		elementType === "minutes-only" ?
			mins :
			hours;

	const secondElemTextToShow = 
		elementType === "minutes-only" ?
			I18n.t("min") :
			I18n.t("hour");

	const thirdElem =
		elementType === "minutes-hours" ?
			<CreateProfileStatsText type="timeNumber" text={mins} /> : undefined;

	const fourthElem =
		elementType === "minutes-hours" ?
			<CreateProfileStatsText type="time" text={I18n.t("min")} /> : undefined;

	return (
		<CreateProfileElement
			leftPart={{
				style: styles.focusContainer,
				firstElem: <Icon />,
				secondElem: <CreateProfileStatsText type="modeName" text={text} />,
			}}
			rightPart={{
				style: styles.statsTextContainer,
				firstElem: <CreateProfileStatsText type="timeNumber" text={firstElemTextToShow} />,
				secondElem: <CreateProfileStatsText type="time" text={secondElemTextToShow} />,
				thirdElem,
				fourthElem,
			}}
		/>
	);
};

const styles = StyleSheet.create({
	statsTextContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},

	focusContainer: {
		alignItems: "center",
		flexDirection: "row",
	},
});

export default CreateStatView;
