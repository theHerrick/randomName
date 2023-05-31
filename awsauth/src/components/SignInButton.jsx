import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <button
        type="button"
        class="btn btn-primary btn-lg"
        onClick={() => handleLogin("popup")}>
        Sign In
      </button>

  );
};