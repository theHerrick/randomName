import React from "react";
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const ProfileData = (props) => {
const { graphData, graphValue } = props;
  return (
      <>{graphData[graphValue]}</>
  );
};