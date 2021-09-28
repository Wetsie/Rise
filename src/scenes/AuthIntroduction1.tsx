import React from "react";
import I18n from "i18n-js";

import AuthIntroductionIllustration1 from "_components/atoms/auth/AuthIntroductionIllustration1";
import CreateAuthScreen from "_components/molecules/create/CreateAuthScreen";

const AuthIntroduction1 = (): JSX.Element => {
	return (
		<CreateAuthScreen
			illustration={AuthIntroductionIllustration1}
			mainText={I18n.t("authIntroduction1")}
			buttonText={I18n.t("continue")}
			pageNumber={1}
		/>
	);
};

export default AuthIntroduction1;
