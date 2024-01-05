import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
function DefualtLayout({ children }) {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      {children}
    </>
  );
}

export default DefualtLayout;
