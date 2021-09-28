import React from "react";
import { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface textType {
	type?: "bold" | "medium" | "bold-obl" | "krona" | "demi",
	style?: TextStyle | TextStyle[],
	children: ReactNode,
}

const CustomText = (props: textType & TextProps): JSX.Element => {
	const setFontType = (type: string) => {
		switch (type) {
		case "bold":
			return "FuturaPT-Bold";

		case "demi":
			return "FuturaPT-Demi";

		case "bold-obl":
			return "FuturaPT-BoldObl";

		case "medium":
			return "FuturaPT-Medium";

		case "krona":
			return "KronaOne-Regular";

		default:
			return "FuturaPT-Book";
		}
	};

	const font = setFontType(props.type ? props.type : "normal");
	const style = [{ fontFamily: font }, props.style || {}];
	const allProps = Object.assign({}, props, { style: style });

	return <Text {...allProps}>{props.children}</Text>;
};

export default CustomText;
