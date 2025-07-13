import {
  CredentialResponse,
  GoogleLogin,
  GsiButtonConfiguration,
} from "@react-oauth/google";
import React from "react";

type GoogleLoginButtonProps = {
  handleGoogleSuccess: (credentialResponse: CredentialResponse) => void;
  handleGoogleError: () => void;
  text: GsiButtonConfiguration["text"];
};

export default function GoogleLoginButton({
  handleGoogleSuccess,
  handleGoogleError,
  text,
}: GoogleLoginButtonProps) {
  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      text={text}
      width="380"
      theme="filled_blue"
      size="large"
      type="standard"
      shape="rectangular"
    />
  );
}
