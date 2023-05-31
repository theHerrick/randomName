import React from "react";
import Navbar from "./Navbar.jsx"

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {

  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};