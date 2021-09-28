import React from "react";
import I18n from "i18n-js";

import AuthIntroductionIllustration2 from "_components/atoms/auth/AuthIntroductionIllustration2";
import CreateAuthScreen from "_components/molecules/create/CreateAuthScreen";

const AuthIntroduction2 = (): JSX.Element => {
	return (
		<CreateAuthScreen
			illustration={AuthIntroductionIllustration2}
			mainText={I18n.t("authIntroduction2")}
			buttonText={I18n.t("continue")}
			pageNumber={2}
		/>
	);
};

export default AuthIntroduction2;
