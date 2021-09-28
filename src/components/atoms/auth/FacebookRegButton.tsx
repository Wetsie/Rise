import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

import { WHITE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_20 } from "_styles/typography";
import CustomText from "../CustomText";

const FacebookRegButton = ({ disabled, disableButtons }: { disabled: boolean, disableButtons: () => void }): JSX.Element => {
	const width = scaleSize(302);
	const height = scaleSize(56);

	const onFacebookButtonPress = async () => {
		try {
			// Attempt login with permissions
			const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
		
			if (result.isCancelled) {
				throw "User cancelled the login process";
			}
		
			// Once signed in, get the users AccesToken
			const data = await AccessToken.getCurrentAccessToken();
		
			if (!data) {
				throw "Something went wrong obtaining access token";
			}
		
			// Create a Firebase credential with the AccessToken
			const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
		
			disableButtons();
			// Sign-in the user with the credential
			return auth().signInWithCredential(facebookCredential);
		} catch {
			null;
		}
	};
    
	return (
		<Pressable
			disabled={disabled}
			onPress={() => onFacebookButtonPress()}
			style={{
				alignItems: "center",
				justifyContent: "center",
				aspectRatio: width / height,
				height,
			}}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 302 56"
				fill="none"
			>
				<Rect width="100%" height="100%" rx={15} fill="#0564F2" />
				<Path
					d="M32.9 19h-2.7a4.5 4.5 0 00-4.5 4.5v2.701H23v3.6h2.7v7.202h3.6v-7.201H32l.9-3.6h-3.6V23.5a.9.9 0 01.9-.9h2.7V19z"
					fill="#FDF5F1"
				/>
			</Svg>
			<CustomText style={{ position: "absolute", color: WHITE, fontSize: FONT_SIZE_20 }}>Facebook</CustomText>
		</Pressable>
	);
};

export default FacebookRegButton;
