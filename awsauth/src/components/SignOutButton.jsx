import React from "react";
import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    }
  };

  return (
    <button
    type="button"
    class="btn btn-primary btn-lg"
    onClick={() => handleLogout("popup")}>
    Sign Out
  </button>
  );
};