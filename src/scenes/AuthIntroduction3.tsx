import React from "react";
import I18n from "i18n-js";

import AuthIntroductionIllustration3 from "_components/atoms/auth/AuthIntroductionIllustration3";
import CreateAuthScreen from "_components/molecules/create/CreateAuthScreen";

const AuthIntroduction3 = (): JSX.Element => {
	return (
		<CreateAuthScreen
			illustration={AuthIntroductionIllustration3}
			mainText={I18n.t("authIntroduction3")}
			buttonText={I18n.t("registration")}
			pageNumber={3}
		/>
	);
};

export default AuthIntroduction3;
