import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { DBLUE } from "_styles/colors";
import { scaleSize } from "_styles/mixins";
import { FONT_SIZE_20 } from "_styles/typography";
import CustomText from "../CustomText";

const GoogleRegButton = ({ disabled, disableButtons }: { disabled: boolean, disableButtons: () => void }): JSX.Element => {
	const width = scaleSize(302);
	const height = scaleSize(56);

	const onGoogleButtonPress = async () => {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();
	
		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		disableButtons();
	
		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	};
    
	return (
		<Pressable
			disabled={disabled}
			style={{
				alignItems: "center",
				justifyContent: "center",
				aspectRatio: width / height,
				borderWidth: 2,
				borderRadius: 15,
				borderColor: DBLUE,
				height,
			}}
			onPress={onGoogleButtonPress}
		>
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 302 56"
				fill="none"
			>
				<Path
					d="M23.99 29.8l-.627 2.339-2.29.048A8.962 8.962 0 0120 27.922c0-1.493.363-2.9 1.006-4.14l2.04.374.893 2.027a5.352 5.352 0 00-.29 1.739c.001.66.12 1.293.34 1.877z"
					fill="#FBBB00"
				/>
				<Path
					d="M37.843 26.32a9.016 9.016 0 01-.04 3.561 9 9 0 01-3.169 5.14l-2.568-.132-.364-2.269a5.364 5.364 0 002.308-2.74h-4.812v-3.56h8.645z"
					fill="#518EF8"
				/>
				<Path
					d="M34.634 35.02v.001A8.961 8.961 0 0129 37.003a8.998 8.998 0 01-7.927-4.736l2.916-2.388a5.351 5.351 0 007.713 2.741l2.932 2.4z"
					fill="#28B446"
				/>
				<Path
					d="M34.745 21.072l-2.916 2.388a5.353 5.353 0 00-7.89 2.803l-2.932-2.401A8.998 8.998 0 0129 19c2.184 0 4.186.778 5.745 2.072z"
					fill="#F14336"
				/>
			</Svg>
			<CustomText style={{ position: "absolute", color: DBLUE, fontSize: FONT_SIZE_20 }}>Google</CustomText>
		</Pressable>
	);
};

export default GoogleRegButton;
